import {Router} from "express";
import {videoController} from "./videoController";

export const videoRouter = Router();

videoRouter.get('/', videoController.getVideos);
videoRouter.post('/', videoController.createVideo);
videoRouter.get('/:id', videoController.getVideo);
videoRouter.put('/:id', videoController.updateVideo);
videoRouter.delete('/:id', videoController.deleteVideo);
videoRouter.delete('/:id', videoController.deleteVideo);