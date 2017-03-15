import { UploadQueue } from './upload-queue';

let fixture: UploadQueue;

describe('Provider: UploadQueue', () => {

    it('is created', () => {
        expect(fixture).toBeTruthy();
    });

    it('returns undefined when empty', () => {
        expect(fixture.getNextPictureUrl()).toBeUndefined();
    });

    it('returns first item that has been added when not empty', () => {
        fixture.addPictureUrl("firstURL");
        fixture.addPictureUrl("secondURL");
        expect(fixture.getNextPictureUrl()).toBe("firstURL");
    });
  
    it('does not add empty strings as URLs', () => {
        fixture.addPictureUrl("");
        expect(fixture.getNextPictureUrl()).toBeUndefined();
    });

    it('does not add NULL strings as URLs', () => {
        fixture.addPictureUrl(null);
        expect(fixture.getNextPictureUrl()).toBeUndefined();
    }); 

    it('does not add UNDEFINED strings as URLs', () => {
        fixture.addPictureUrl(undefined);
        expect(fixture.getNextPictureUrl()).toBeUndefined();
    }); 

    it('does not complain when url to be removed is not in Buffer', () => {
        expect(fixture.removePictureUrl("someURL")).toBeUndefined(); 
    }); 

    it('removes URL when present in Buffer', () => {
        fixture.addPictureUrl("firstURL");
        fixture.removePictureUrl("firstURL");
        expect(fixture.getNextPictureUrl()).toBeFalsy();
    });

    it('removes URL when present in Buffer, leaving other URLs in buffer untouched', () => {
        fixture.addPictureUrl("firstURL");
        fixture.addPictureUrl("secondURL");
        fixture.addPictureUrl("thirdURL");
        fixture.removePictureUrl("firstURL");
        
        expect(fixture.getNextPictureUrl()).toBe("secondURL");
        
        fixture.removePictureUrl("secondURL");
        
        expect(fixture.getNextPictureUrl()).toBe("thirdURL");
    });

    beforeEach(() => {
      fixture = new UploadQueue();
    });
 
    afterEach(() => {
        fixture = null;
    });
  
});


