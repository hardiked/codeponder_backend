import DataLoader from "dataloader";
import QuestionResponse from "../models/QuestionResponse";

// type BatchUser = (ids: string[]) => Promise<User[]>;

const batchResponses = async ids => {
    //   const users = await User.findByIds(ids).select('email');
    const responses = await QuestionResponse.find({
        questionId: {
            $in: ids
        }
    });
    const qrMap = [];
    responses.forEach(response => {
        if (response.questionId in qrMap) {
            qrMap[response.questionId].push(response);
        } else {
            qrMap[response.questionId] = [response];
        }
    });

    return ids.map(id => qrMap[id]);
};

export const responseLoader = () => new DataLoader(batchResponses);
