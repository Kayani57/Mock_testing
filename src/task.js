import { GoogleCloudTask } from '../task';
import {
  PA_TRANSACTION_QUEUE_NAME,
  PA_TRANSACTION_QUEUE
} from '../../util/constants';
import { PATransactionModel } from '../../graphql/model/PATransactionModel';
export class PATransactionTask extends GoogleCloudTask {
  QUEUE_LOCATION = PA_TRANSACTION_QUEUE;
  QUEUE_NAME = PA_TRANSACTION_QUEUE_NAME;

run = async (_db, task) => {
    if (task) {
      try {
        const cloudIndexDocument = (
          JSON.parse(Buffer.from(task.payload, 'base64').toString())
        );

        await PATransactionModel.runTask(
          this.DB,
          cloudIndexDocument.id,
          cloudIndexDocument.parentId
        );
      } catch (e) {
        console.error(e);
      }
    }
  };
}