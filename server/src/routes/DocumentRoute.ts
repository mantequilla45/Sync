import { Router} from "express"
import { saveDocument } from "../controllers/DocumentControllers/saveDocumentTentative"

const router = Router();

console.log("reached");
router.post('/saveDocument', saveDocument);

export const DocumentRoute = router;