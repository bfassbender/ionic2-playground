import { ImageUploader } from './image-uploader';
import { Observable } from 'rxjs/Rx'
let cut: ImageUploader;

describe('Provider: UploadQueue', () => {

    it('is created', () => {
        expect(cut).toBeTruthy();
    });


    it('can take a list of image urls to upload and returns an Observable as handle (async)', done => {
        let expected = ['firstUrl', 'secondUrl'];
        cut.uploadImages(expected).subscribe({
            next: x =>  expect(x).toBeTruthy(),
            error: e => fail(e),
            complete: () => done()
        });
    });



    beforeEach(() => {
      cut = new ImageUploader();
    });
});