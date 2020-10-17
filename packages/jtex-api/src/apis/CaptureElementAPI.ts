import JtexAPI from '../JtexAPI';

export class CaptureElementAPI extends JtexAPI<void, string | HTMLElement | Document> {
    public async apply(target: string | HTMLElement | Document): Promise<void> {
        if (target instanceof Document) {
            // CAPTURE FULL PAGE
        } else if (target instanceof HTMLElement) {
            // CAPTURE ELEMENT
        } else {
            //
        }
    }
}
