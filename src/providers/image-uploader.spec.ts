import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { ImageUploader } from './image-uploader';
import { Transfer } from  '@ionic-native/transfer';

let cut: ImageUploader;
let fixture: ComponentFixture<ImageUploader>;

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
        cut.doReactiveStuff(); 
    });


    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [ImageUploader],
 
            providers: [
                Transfer use
            ],
 
            imports: [
                IonicModule.forRoot(ImageUploader)
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(ImageUploader);
        cut    = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        cut = null;
    });
});