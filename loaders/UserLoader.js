import DataLoader from "dataloader";
import User from "../models/User";

// type BatchUser = (ids: string[]) => Promise<User[]>;

const batchUsers = async ids => {
    //   const users = await User.findByIds(ids).select('email');
    const users = await User.find({
        _id: {
            $in: ids
        }
    });
    //   var i=0;
    //   var users=[];
    //   for(i=0;i<ids.length;i++){
    //     users.push(await User.findById(ids[i]).select('email'));
    //   }
    const userMap = {};
    users.forEach(u => {
        userMap[u.id] = u;
    });

    return ids.map(id => userMap[id]);
};

export const userLoader = () => new DataLoader(batchUsers);
