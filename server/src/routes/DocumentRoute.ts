import { Router} from "express"
import { saveDocument } from "../controllers/DocumentControllers/saveDocumentTentative"

const router = Router();

router.post('/saveDocument', saveDocument);

export const DocumentRoute = router;