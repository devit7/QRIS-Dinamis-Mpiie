declare module "qris-dynamic-generator" {
  class QrisDynamicGenerator {
    constructor(qrisPayload: string);

    /**
     * Generate base64 QR code image with specified amount
     * @param amount - Amount in IDR
     * @param size - QR code size in pixels (optional, default varies)
     * @returns Promise that resolves to base64 encoded QR code image
     */
    generateBase64(amount: number, size?: number): Promise<string>;

    /**
     * Generate QRIS string with specified amount
     * @param amount - Amount in IDR
     * @returns QRIS string
     */
    generateQRIS(amount: number): string;

    /**
     * Set the amount for the QRIS
     * @param amount - Amount in IDR
     */
    setAmount(amount: number): void;

    /**
     * Get current amount
     * @returns Current amount
     */
    getAmount(): number;

    /**
     * Validate QRIS payload
     * @returns Whether the payload is valid
     */
    isValid(): boolean;
  }

  export = QrisDynamicGenerator;
}
