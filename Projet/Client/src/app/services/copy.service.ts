import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Copy } from '../model/copy';
import { BaseHttpService } from './baseHttpService';
import {Book} from '../model/book';

@Injectable()
export class CopyService extends BaseHttpService {

    public getCopy(bookId: string, copyId: string): Observable<Copy> {
        return this.http
            .get<Copy>(`${this.baseUrl}/nook/${bookId}/copies/${copyId}`);
    }

    public getAvailable(bookId: string): Observable<Copy[]> {
        return this.http.get<Copy[]>(`${this.baseUrl}/books/${bookId}/availableCopies`);
    }

    public getBookForCopy(id: string): Observable<Book> {
        return this.http.get<Book>(`${this.baseUrl}/copies/${id}/book`);
    }
}
