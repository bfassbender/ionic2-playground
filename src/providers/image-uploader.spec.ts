import { ImageUploader } from './image-uploader';
let cut: ImageUploader;

describe('Provider: ImageUploader', () => {

    it('is created', () => {
        expect(cut).toBeTruthy();
    });


    it('can take a list of image urls to upload and returns an Observable as handle (async)', done => {
        let expected = ['firstUrl', 'secondUrl'];
        cut.uploadImages(expected).subscribe({
            next: x =>  expect(expected).toContain(x),
            error: e => fail(e),
            complete: () => done()
        });
    });

    beforeEach(() => {
      cut = new ImageUploader();
    });
});