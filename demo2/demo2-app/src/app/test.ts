export default interface ISpeedtestResults {
    downloadSpeed: number;
    uploadSpeed: number;
    ping: number;
    server: {
      id: number;
      name: string;
      url: string;
    };
    client: {
      ip: string;
      isp: string;
    };
  }