/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { shiftDate, formatDate } from 'ngx-bootstrap/chronos';
import { createMatrix } from '../utils/matrix-utils';
/** @type {?} */
var height = 4;
/** @type {?} */
var width = 4;
/** @type {?} */
export var yearsPerCalendar = height * width;
/** @type {?} */
var initialShift = (Math.floor(yearsPerCalendar / 2) - 1) * -1;
/** @type {?} */
var shift = { year: 1 };
/**
 * @param {?} viewDate
 * @param {?} formatOptions
 * @return {?}
 */
export function formatYearsCalendar(viewDate, formatOptions) {
    /** @type {?} */
    var initialDate = shiftDate(viewDate, { year: initialShift });
    /** @type {?} */
    var matrixOptions = { width: width, height: height, initialDate: initialDate, shift: shift };
    /** @type {?} */
    var yearsMatrix = createMatrix(matrixOptions, (/**
     * @param {?} date
     * @return {?}
     */
    function (date) { return ({
        date: date,
        label: formatDate(date, formatOptions.yearLabel, formatOptions.locale)
    }); }));
    /** @type {?} */
    var yearTitle = formatYearRangeTitle(yearsMatrix, formatOptions);
    return {
        years: yearsMatrix,
        monthTitle: '',
        yearTitle: yearTitle
    };
}
/**
 * @param {?} yearsMatrix
 * @param {?} formatOptions
 * @return {?}
 */
function formatYearRangeTitle(yearsMatrix, formatOptions) {
    /** @type {?} */
    var from = formatDate(yearsMatrix[0][0].date, formatOptions.yearTitle, formatOptions.locale);
    /** @type {?} */
    var to = formatDate(yearsMatrix[height - 1][width - 1].date, formatOptions.yearTitle, formatOptions.locale);
    return from + " - " + to;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LXllYXJzLWNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiZW5naW5lL2Zvcm1hdC15ZWFycy1jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0lBRS9DLE1BQU0sR0FBRyxDQUFDOztJQUNWLEtBQUssR0FBRyxDQUFDOztBQUNmLE1BQU0sS0FBTyxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsS0FBSzs7SUFDeEMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7O0lBQzFELEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7Ozs7OztBQUV6QixNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFFBQWMsRUFDZCxhQUFzQzs7UUFFaEMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7O1FBQ3pELGFBQWEsR0FBRyxFQUFFLEtBQUssT0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLFdBQVcsYUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFOztRQUNyRCxXQUFXLEdBQUcsWUFBWSxDQUU5QixhQUFhOzs7O0lBQUUsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDO1FBQ3hCLElBQUksTUFBQTtRQUNKLEtBQUssRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQztLQUN2RSxDQUFDLEVBSHVCLENBR3ZCLEVBQUM7O1FBQ0csU0FBUyxHQUFHLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUM7SUFFbEUsT0FBTztRQUNMLEtBQUssRUFBRSxXQUFXO1FBQ2xCLFVBQVUsRUFBRSxFQUFFO1FBQ2QsU0FBUyxXQUFBO0tBQ1YsQ0FBQztBQUNKLENBQUM7Ozs7OztBQUVELFNBQVMsb0JBQW9CLENBQzNCLFdBQXNDLEVBQ3RDLGFBQXNDOztRQUVoQyxJQUFJLEdBQUcsVUFBVSxDQUNyQixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUN0QixhQUFhLENBQUMsU0FBUyxFQUN2QixhQUFhLENBQUMsTUFBTSxDQUNyQjs7UUFDSyxFQUFFLEdBQUcsVUFBVSxDQUNuQixXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3ZDLGFBQWEsQ0FBQyxTQUFTLEVBQ3ZCLGFBQWEsQ0FBQyxNQUFNLENBQ3JCO0lBRUQsT0FBVSxJQUFJLFdBQU0sRUFBSSxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEYXRlcGlja2VyRm9ybWF0T3B0aW9ucyxcbiAgWWVhcnNDYWxlbmRhclZpZXdNb2RlbCxcbiAgQ2FsZW5kYXJDZWxsVmlld01vZGVsXG59IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBzaGlmdERhdGUsIGZvcm1hdERhdGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Nocm9ub3MnO1xuaW1wb3J0IHsgY3JlYXRlTWF0cml4IH0gZnJvbSAnLi4vdXRpbHMvbWF0cml4LXV0aWxzJztcblxuY29uc3QgaGVpZ2h0ID0gNDtcbmNvbnN0IHdpZHRoID0gNDtcbmV4cG9ydCBjb25zdCB5ZWFyc1BlckNhbGVuZGFyID0gaGVpZ2h0ICogd2lkdGg7XG5jb25zdCBpbml0aWFsU2hpZnQgPSAoTWF0aC5mbG9vcih5ZWFyc1BlckNhbGVuZGFyIC8gMikgLSAxKSAqIC0xO1xuY29uc3Qgc2hpZnQgPSB7IHllYXI6IDEgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFllYXJzQ2FsZW5kYXIoXG4gIHZpZXdEYXRlOiBEYXRlLFxuICBmb3JtYXRPcHRpb25zOiBEYXRlcGlja2VyRm9ybWF0T3B0aW9uc1xuKTogWWVhcnNDYWxlbmRhclZpZXdNb2RlbCB7XG4gIGNvbnN0IGluaXRpYWxEYXRlID0gc2hpZnREYXRlKHZpZXdEYXRlLCB7IHllYXI6IGluaXRpYWxTaGlmdCB9KTtcbiAgY29uc3QgbWF0cml4T3B0aW9ucyA9IHsgd2lkdGgsIGhlaWdodCwgaW5pdGlhbERhdGUsIHNoaWZ0IH07XG4gIGNvbnN0IHllYXJzTWF0cml4ID0gY3JlYXRlTWF0cml4PFxuICAgIENhbGVuZGFyQ2VsbFZpZXdNb2RlbFxuICA+KG1hdHJpeE9wdGlvbnMsIGRhdGUgPT4gKHtcbiAgICBkYXRlLFxuICAgIGxhYmVsOiBmb3JtYXREYXRlKGRhdGUsIGZvcm1hdE9wdGlvbnMueWVhckxhYmVsLCBmb3JtYXRPcHRpb25zLmxvY2FsZSlcbiAgfSkpO1xuICBjb25zdCB5ZWFyVGl0bGUgPSBmb3JtYXRZZWFyUmFuZ2VUaXRsZSh5ZWFyc01hdHJpeCwgZm9ybWF0T3B0aW9ucyk7XG5cbiAgcmV0dXJuIHtcbiAgICB5ZWFyczogeWVhcnNNYXRyaXgsXG4gICAgbW9udGhUaXRsZTogJycsXG4gICAgeWVhclRpdGxlXG4gIH07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFllYXJSYW5nZVRpdGxlKFxuICB5ZWFyc01hdHJpeDogQ2FsZW5kYXJDZWxsVmlld01vZGVsW11bXSxcbiAgZm9ybWF0T3B0aW9uczogRGF0ZXBpY2tlckZvcm1hdE9wdGlvbnNcbik6IHN0cmluZyB7XG4gIGNvbnN0IGZyb20gPSBmb3JtYXREYXRlKFxuICAgIHllYXJzTWF0cml4WzBdWzBdLmRhdGUsXG4gICAgZm9ybWF0T3B0aW9ucy55ZWFyVGl0bGUsXG4gICAgZm9ybWF0T3B0aW9ucy5sb2NhbGVcbiAgKTtcbiAgY29uc3QgdG8gPSBmb3JtYXREYXRlKFxuICAgIHllYXJzTWF0cml4W2hlaWdodCAtIDFdW3dpZHRoIC0gMV0uZGF0ZSxcbiAgICBmb3JtYXRPcHRpb25zLnllYXJUaXRsZSxcbiAgICBmb3JtYXRPcHRpb25zLmxvY2FsZVxuICApO1xuXG4gIHJldHVybiBgJHtmcm9tfSAtICR7dG99YDtcbn1cbiJdfQ==