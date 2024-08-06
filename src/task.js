import { GoogleCloudTask } from '../src/function.js';
import {
  PA_TRANSACTION_QUEUE_NAME,
  PA_TRANSACTION_QUEUE
} from '../src/function.js';
import { PATransactionModel } from '../src/function.js';
export class PATransactionTask extends GoogleCloudTask {
  QUEUE_LOCATION = PA_TRANSACTION_QUEUE;
  QUEUE_NAME = PA_TRANSACTION_QUEUE_NAME;

    run = async (_db, task) => {
    if (task) {
      try {
        const cloudIndexDocument = (
          JSON.parse(Buffer.from(task.payload, 'base64').toString())
        );
        if(cloudIndexDocument.id===''||cloudIndexDocument.parentId===''||cloudIndexDocument.id===undefined||cloudIndexDocument.parentId===undefined){
            console.error("Something missing in JSON")
        }
        else{

        await PATransactionModel.runTask(this.DB,cloudIndexDocument.id,cloudIndexDocument.parentId);}

         } 
      
      catch (e) {
        console.error(e);
      }
    }
  };
}