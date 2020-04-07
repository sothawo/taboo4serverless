import {TestBed} from '@angular/core/testing';

import {LocalStorageService} from './local-storage.service';

describe('LocalStorageService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: LocalStorageService = TestBed.get(LocalStorageService);
        expect(service).toBeTruthy();
    });

    it('should return stored value', () => {
        const service: LocalStorageService = TestBed.get(LocalStorageService);

        service.set('foo', 'bar');
        const result = service.get('foo');

        expect(result).toBe('bar');
    });
});
