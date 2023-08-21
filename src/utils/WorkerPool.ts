export interface Task<TData, TResult> {
  runAsync(data: TData): Promise<TResult>;
  map<TResult2>(map: (result: TResult) => TResult2): Task<TData, TResult2>;
  then<TResult2>(onfulfilled?: Task<TResult, TResult2>): Task<TData, TResult2>;
}

export interface WorkerPoolOptions {
  maxWorkers: number;
}

type WorkerId = number;

export class WorkerPool {

  private workers: Map<WorkerId, Worker>;
  private idle: WorkerId[];
  private busy: Map<WorkerId, (data: any) => any>;
  private backlog: { id: number; task: (data: any) => void; data: any }[];
  private options: WorkerPoolOptions;


  private workerTemplate(): void {
    onmessage = async (event: MessageEvent) => {
      try {
        var method = new Function(`return ${event.data.method}`)();
        var args = event.data.args.map((arg: any) =>
          arg.type === "function" ? new Function(`return ${arg.method}`)() : arg
        );
        try {
          var result = await method.apply(this, args);
          return postMessage(result);
        } catch (error: any) {
          postMessage({ error: error.message });
        }
      } catch (error: any) {
        postMessage({ error: error.message });
      }
    };
  }
}
