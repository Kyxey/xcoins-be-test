export type SimulatorSchema = {
  profile_id: string;
  name: string;
  cryptocurrency: string;
  start_date?: Date;
  check_date?: Date;
  divisa: string;
  crypto_price_start?: number;
  crypto_price_check?: number;
};
