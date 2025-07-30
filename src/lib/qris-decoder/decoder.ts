import { tagsArray } from "./tags";
import { QrisData, QrisTag, QrisTagValue } from "./types";

/**
 * Function to decode specific tag values based on their names
 */
const decodeTagValue = (tagName: string, value: string): QrisTagValue => {
  switch (tagName) {
    case "point_of_initiation_method":
      return value === "11" ? "STATIC" : value === "12" ? "DYNAMIC" : value;
    case "transaction_currency":
      return value === "360" ? "RUPIAH" : value;
    case "tip_indicator":
      return value === "01"
        ? "INPUT_TIP"
        : value === "02"
        ? "FIXED_TIP"
        : value === "03"
        ? "FIXED_TIP_PERCENTAGE"
        : value;
    case "fixed_tip_amount":
    case "transaction_amount":
    case "percentage_tip_amount":
      return Number(value);
    default:
      return value;
  }
};

/**
 * Function to decode the QRIS payload from string
 * @param qrisPayload - The QRIS payload string to decode
 * @returns Decoded QRIS data object
 */
export function decodeFromString(qrisPayload: string): QrisData {
  const data: QrisData = {};

  /**
   * Function to parse the QRIS payload recursively
   */
  const parse = (tags: QrisTag[], qrPayload: string, parent?: string): void => {
    let index = 0;

    // Loop through the QR payload
    while (index < qrPayload.length) {
      const qr = qrPayload.substring(index);
      const tagId = qr.substring(0, 2);
      const tagValueLength = Number(qr.substring(2, 4));
      const tagValue = qr.substring(4, 4 + tagValueLength);

      // Find the tag in the tags array
      const findTag = tags.find((tag) => tag.id === tagId);

      if (findTag) {
        if (findTag.children) {
          // If the tag has children, initialize a nested object and recurse
          if (parent) {
            data[parent] = {
              ...(data[parent] as object),
              [findTag.name]: {},
            };
          } else {
            data[findTag.name] = {};
          }
          parse(
            findTag.children,
            tagValue,
            parent ? `${parent}.${findTag.name}` : findTag.name
          );
        } else {
          // Decode the tag value if necessary
          const decodedValue = decodeTagValue(findTag.name, tagValue);

          // Assign the tag value to the data object
          if (parent) {
            const parentPath = parent.split(".");
            let current: Record<string, unknown> = data;

            // Navigate to the correct nested object
            for (const path of parentPath) {
              if (!current[path]) {
                current[path] = {};
              }
              current = current[path] as Record<string, unknown>;
            }

            current[findTag.name] = decodedValue;
          } else {
            data[findTag.name] = decodedValue;
          }
        }
      }

      // Move to the next tag in the QR payload
      index += tagValueLength + 4;
    }
  };

  // Start parsing the QRIS payload
  parse(tagsArray, qrisPayload);
  return data;
}

/**
 * Helper function to validate QRIS payload format
 */
export function isValidQrisPayload(payload: string): boolean {
  if (!payload || typeof payload !== "string") {
    return false;
  }

  // Basic validation - QRIS should start with payload format indicator
  return payload.length >= 4 && payload.substring(0, 2) === "00";
}

/**
 * Helper function to extract merchant information
 */
export function extractMerchantInfo(qrisData: QrisData): {
  name?: string;
  city?: string;
  postalCode?: string;
  categoryCode?: string;
} {
  return {
    name: qrisData.merchant_name as string,
    city: qrisData.merchant_city as string,
    postalCode: qrisData.postal_code as string,
    categoryCode: qrisData.merchant_category_code as string,
  };
}

/**
 * Helper function to extract transaction information
 */
export function extractTransactionInfo(qrisData: QrisData): {
  amount?: number;
  currency?: string;
  tipIndicator?: string;
  fixedTipAmount?: number;
  percentageTipAmount?: number;
} {
  return {
    amount: qrisData.transaction_amount as number,
    currency: qrisData.transaction_currency as string,
    tipIndicator: qrisData.tip_indicator as string,
    fixedTipAmount: qrisData.fixed_tip_amount as number,
    percentageTipAmount: qrisData.percentage_tip_amount as number,
  };
}
