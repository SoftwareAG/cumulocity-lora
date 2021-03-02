/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { shiftDate, formatDate } from 'ngx-bootstrap/chronos';
import { createMatrix } from '../utils/matrix-utils';
/** @type {?} */
const height = 4;
/** @type {?} */
const width = 4;
/** @type {?} */
export const yearsPerCalendar = height * width;
/** @type {?} */
const initialShift = (Math.floor(yearsPerCalendar / 2) - 1) * -1;
/** @type {?} */
const shift = { year: 1 };
/**
 * @param {?} viewDate
 * @param {?} formatOptions
 * @return {?}
 */
export function formatYearsCalendar(viewDate, formatOptions) {
    /** @type {?} */
    const initialDate = shiftDate(viewDate, { year: initialShift });
    /** @type {?} */
    const matrixOptions = { width, height, initialDate, shift };
    /** @type {?} */
    const yearsMatrix = createMatrix(matrixOptions, (/**
     * @param {?} date
     * @return {?}
     */
    date => ({
        date,
        label: formatDate(date, formatOptions.yearLabel, formatOptions.locale)
    })));
    /** @type {?} */
    const yearTitle = formatYearRangeTitle(yearsMatrix, formatOptions);
    return {
        years: yearsMatrix,
        monthTitle: '',
        yearTitle
    };
}
/**
 * @param {?} yearsMatrix
 * @param {?} formatOptions
 * @return {?}
 */
function formatYearRangeTitle(yearsMatrix, formatOptions) {
    /** @type {?} */
    const from = formatDate(yearsMatrix[0][0].date, formatOptions.yearTitle, formatOptions.locale);
    /** @type {?} */
    const to = formatDate(yearsMatrix[height - 1][width - 1].date, formatOptions.yearTitle, formatOptions.locale);
    return `${from} - ${to}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LXllYXJzLWNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiZW5naW5lL2Zvcm1hdC15ZWFycy1jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O01BRS9DLE1BQU0sR0FBRyxDQUFDOztNQUNWLEtBQUssR0FBRyxDQUFDOztBQUNmLE1BQU0sT0FBTyxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsS0FBSzs7TUFDeEMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7O01BQzFELEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7Ozs7OztBQUV6QixNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFFBQWMsRUFDZCxhQUFzQzs7VUFFaEMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7O1VBQ3pELGFBQWEsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTs7VUFDckQsV0FBVyxHQUFHLFlBQVksQ0FFOUIsYUFBYTs7OztJQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QixJQUFJO1FBQ0osS0FBSyxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDO0tBQ3ZFLENBQUMsRUFBQzs7VUFDRyxTQUFTLEdBQUcsb0JBQW9CLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQztJQUVsRSxPQUFPO1FBQ0wsS0FBSyxFQUFFLFdBQVc7UUFDbEIsVUFBVSxFQUFFLEVBQUU7UUFDZCxTQUFTO0tBQ1YsQ0FBQztBQUNKLENBQUM7Ozs7OztBQUVELFNBQVMsb0JBQW9CLENBQzNCLFdBQXNDLEVBQ3RDLGFBQXNDOztVQUVoQyxJQUFJLEdBQUcsVUFBVSxDQUNyQixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUN0QixhQUFhLENBQUMsU0FBUyxFQUN2QixhQUFhLENBQUMsTUFBTSxDQUNyQjs7VUFDSyxFQUFFLEdBQUcsVUFBVSxDQUNuQixXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3ZDLGFBQWEsQ0FBQyxTQUFTLEVBQ3ZCLGFBQWEsQ0FBQyxNQUFNLENBQ3JCO0lBRUQsT0FBTyxHQUFHLElBQUksTUFBTSxFQUFFLEVBQUUsQ0FBQztBQUMzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGF0ZXBpY2tlckZvcm1hdE9wdGlvbnMsXG4gIFllYXJzQ2FsZW5kYXJWaWV3TW9kZWwsXG4gIENhbGVuZGFyQ2VsbFZpZXdNb2RlbFxufSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgc2hpZnREYXRlLCBmb3JtYXREYXRlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jaHJvbm9zJztcbmltcG9ydCB7IGNyZWF0ZU1hdHJpeCB9IGZyb20gJy4uL3V0aWxzL21hdHJpeC11dGlscyc7XG5cbmNvbnN0IGhlaWdodCA9IDQ7XG5jb25zdCB3aWR0aCA9IDQ7XG5leHBvcnQgY29uc3QgeWVhcnNQZXJDYWxlbmRhciA9IGhlaWdodCAqIHdpZHRoO1xuY29uc3QgaW5pdGlhbFNoaWZ0ID0gKE1hdGguZmxvb3IoeWVhcnNQZXJDYWxlbmRhciAvIDIpIC0gMSkgKiAtMTtcbmNvbnN0IHNoaWZ0ID0geyB5ZWFyOiAxIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRZZWFyc0NhbGVuZGFyKFxuICB2aWV3RGF0ZTogRGF0ZSxcbiAgZm9ybWF0T3B0aW9uczogRGF0ZXBpY2tlckZvcm1hdE9wdGlvbnNcbik6IFllYXJzQ2FsZW5kYXJWaWV3TW9kZWwge1xuICBjb25zdCBpbml0aWFsRGF0ZSA9IHNoaWZ0RGF0ZSh2aWV3RGF0ZSwgeyB5ZWFyOiBpbml0aWFsU2hpZnQgfSk7XG4gIGNvbnN0IG1hdHJpeE9wdGlvbnMgPSB7IHdpZHRoLCBoZWlnaHQsIGluaXRpYWxEYXRlLCBzaGlmdCB9O1xuICBjb25zdCB5ZWFyc01hdHJpeCA9IGNyZWF0ZU1hdHJpeDxcbiAgICBDYWxlbmRhckNlbGxWaWV3TW9kZWxcbiAgPihtYXRyaXhPcHRpb25zLCBkYXRlID0+ICh7XG4gICAgZGF0ZSxcbiAgICBsYWJlbDogZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXRPcHRpb25zLnllYXJMYWJlbCwgZm9ybWF0T3B0aW9ucy5sb2NhbGUpXG4gIH0pKTtcbiAgY29uc3QgeWVhclRpdGxlID0gZm9ybWF0WWVhclJhbmdlVGl0bGUoeWVhcnNNYXRyaXgsIGZvcm1hdE9wdGlvbnMpO1xuXG4gIHJldHVybiB7XG4gICAgeWVhcnM6IHllYXJzTWF0cml4LFxuICAgIG1vbnRoVGl0bGU6ICcnLFxuICAgIHllYXJUaXRsZVxuICB9O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRZZWFyUmFuZ2VUaXRsZShcbiAgeWVhcnNNYXRyaXg6IENhbGVuZGFyQ2VsbFZpZXdNb2RlbFtdW10sXG4gIGZvcm1hdE9wdGlvbnM6IERhdGVwaWNrZXJGb3JtYXRPcHRpb25zXG4pOiBzdHJpbmcge1xuICBjb25zdCBmcm9tID0gZm9ybWF0RGF0ZShcbiAgICB5ZWFyc01hdHJpeFswXVswXS5kYXRlLFxuICAgIGZvcm1hdE9wdGlvbnMueWVhclRpdGxlLFxuICAgIGZvcm1hdE9wdGlvbnMubG9jYWxlXG4gICk7XG4gIGNvbnN0IHRvID0gZm9ybWF0RGF0ZShcbiAgICB5ZWFyc01hdHJpeFtoZWlnaHQgLSAxXVt3aWR0aCAtIDFdLmRhdGUsXG4gICAgZm9ybWF0T3B0aW9ucy55ZWFyVGl0bGUsXG4gICAgZm9ybWF0T3B0aW9ucy5sb2NhbGVcbiAgKTtcblxuICByZXR1cm4gYCR7ZnJvbX0gLSAke3RvfWA7XG59XG4iXX0=