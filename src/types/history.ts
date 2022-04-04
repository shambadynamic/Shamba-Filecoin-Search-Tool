export interface History {
  type?: "FIRE" | "GEO-SPATIAL";
  request: {
    agg_x: string;
    dataset_code: string;
    selected_band: string;
    geometry: {
      type: string;
      features: Array<{
        type: string;
        properties: any;
        geometry: {
          type: string;
          coordinates: Array<Array<Array<[number, number]>>>;
        };
      }>;
    };
    start_date: string;
    end_date: string;
    image_scale: number;
  };
  response: {
    datetime: string;
    agg_mean: number;
    result: number;
    contract_address: string;
    operator_address: string;
    tx_hash: string;
  };
}

export interface FireHistory {
  type?: "FIRE" | "GEO-SPATIAL";
  request: {
    dataset_code: string;
    selected_band: string;
    geometry: {
      type: string;
      features: Array<{
        type: string;
        properties: any;
        geometry: {
          type: string;
          coordinates: Array<Array<Array<[number, number]>>>;
        };
      }>;
    };
    start_date: string;
    end_date: string;
    image_scale: number;
  };
  response: {
    datetime: string;
    result: number;
    contract_address: string;
    operator_address: string;
    tx_hash: string;
  };
}

export interface KeyPair<Type> {
  [key: string]: Type;
}
