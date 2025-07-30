export interface QrisTag {
  id: string;
  name: string;
  children?: QrisTag[];
}

export interface QrisData {
  point_of_initiation_method?: 'STATIC' | 'DYNAMIC' | string;
  transaction_currency?: 'RUPIAH' | string;
  tip_indicator?: 'INPUT_TIP' | 'FIXED_TIP' | 'FIXED_TIP_PERCENTAGE' | string;
  fixed_tip_amount?: number;
  transaction_amount?: number;
  percentage_tip_amount?: number;
  merchant_account_information?: {
    [key: string]: any;
  };
  merchant_category_code?: string;
  merchant_name?: string;
  merchant_city?: string;
  postal_code?: string;
  additional_data_field?: {
    [key: string]: any;
  };
  crc?: string;
  [key: string]: any;
}

export type QrisTagValue = string | number | QrisData;
