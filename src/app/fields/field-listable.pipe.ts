import { Pipe, PipeTransform } from '@angular/core';

import { FieldDef } from './field-def';

@Pipe({
    name: 'isListable',
    pure: false
})
export class FieldListablePipe implements PipeTransform {
    transform(fields: FieldDef[]): any {
        if (!fields) {
            return fields;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return fields.filter(field => field.isListable);
    }
}
