import { bucket } from "../../lib/Firebase/_index"

export const loadDocument = async (fileName: string): Promise<string | null> => {
    const file = bucket.file(`documents/${fileName}.html`);
    try {
        const [contents] = await file.download();
        return contents.toString('utf8');
    } catch (error) {
        console.error('Error loading document:', error);
        return null;
    }
}
