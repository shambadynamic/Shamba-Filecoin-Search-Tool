export interface History {
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
    tx_hash: string;
  };
}

export interface HistoriesKeyPairValue {
  [key: string]: History;
}
