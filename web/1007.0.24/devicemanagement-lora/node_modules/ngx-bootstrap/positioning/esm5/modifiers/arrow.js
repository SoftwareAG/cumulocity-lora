/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getClientRect, getOuterSizes, getStyleComputedProperty } from '../utils';
/**
 * @param {?} data
 * @return {?}
 */
export function arrow(data) {
    var _a;
    /** @type {?} */
    var targetOffsets = data.offsets.target;
    // if arrowElement is a string, suppose it's a CSS selector
    /** @type {?} */
    var arrowElement = data.instance.target.querySelector('.arrow');
    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
        return data;
    }
    /** @type {?} */
    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    /** @type {?} */
    var len = isVertical ? 'height' : 'width';
    /** @type {?} */
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    /** @type {?} */
    var side = sideCapitalized.toLowerCase();
    /** @type {?} */
    var altSide = isVertical ? 'left' : 'top';
    /** @type {?} */
    var opSide = isVertical ? 'bottom' : 'right';
    /** @type {?} */
    var arrowElementSize = getOuterSizes(arrowElement)[len];
    // top/left side
    if (data.offsets.host[opSide] - arrowElementSize < ((/** @type {?} */ (targetOffsets)))[side]) {
        ((/** @type {?} */ (targetOffsets)))[side] -=
            ((/** @type {?} */ (targetOffsets)))[side] - (data.offsets.host[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (Number(((/** @type {?} */ (data))).offsets.host[side]) + Number(arrowElementSize) > ((/** @type {?} */ (targetOffsets)))[opSide]) {
        ((/** @type {?} */ (targetOffsets)))[side] +=
            Number(((/** @type {?} */ (data))).offsets.host[side]) + Number(arrowElementSize) - Number(((/** @type {?} */ (targetOffsets)))[opSide]);
    }
    targetOffsets = getClientRect(targetOffsets);
    // compute center of the target
    /** @type {?} */
    var center = Number(((/** @type {?} */ (data))).offsets.host[side]) + Number(data.offsets.host[len] / 2 - arrowElementSize / 2);
    // Compute the sideValue using the updated target offsets
    // take target margin in account because we don't have this info available
    /** @type {?} */
    var css = getStyleComputedProperty(data.instance.target);
    /** @type {?} */
    var targetMarginSide = parseFloat(css["margin" + sideCapitalized]);
    /** @type {?} */
    var targetBorderSide = parseFloat(css["border" + sideCapitalized + "Width"]);
    /** @type {?} */
    var sideValue = center - ((/** @type {?} */ (targetOffsets)))[side] - targetMarginSide - targetBorderSide;
    // prevent arrowElement from being placed not contiguously to its target
    sideValue = Math.max(Math.min(targetOffsets[len] - arrowElementSize, sideValue), 0);
    data.offsets.arrow = (_a = {},
        _a[side] = Math.round(sideValue),
        _a[altSide] = '' // make sure to unset any eventual altSide value from the DOM node
    ,
        _a);
    data.instance.arrow = arrowElement;
    return data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nLyIsInNvdXJjZXMiOlsibW9kaWZpZXJzL2Fycm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7Ozs7QUFHbEYsTUFBTSxVQUFVLEtBQUssQ0FBQyxJQUFVOzs7UUFDMUIsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTs7O1FBRWpDLFlBQVksR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUVyRix1REFBdUQ7SUFDdkQsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQixPQUFPLElBQUksQ0FBQztLQUNiOztRQUVLLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFFN0QsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPOztRQUNyQyxlQUFlLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU07O1FBQzdDLElBQUksR0FBRyxlQUFlLENBQUMsV0FBVyxFQUFFOztRQUNwQyxPQUFPLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUs7O1FBQ3JDLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTzs7UUFDeEMsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUV6RCxnQkFBZ0I7SUFDaEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsR0FBRyxDQUFDLG1CQUFBLGFBQWEsRUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDL0UsQ0FBQyxtQkFBQSxhQUFhLEVBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMxQixDQUFDLG1CQUFBLGFBQWEsRUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ2pGO0lBQ0Qsb0JBQW9CO0lBQ3BCLElBQUksTUFBTSxDQUFDLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxtQkFBQSxhQUFhLEVBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3hHLENBQUMsbUJBQUEsYUFBYSxFQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsTUFBTSxDQUFDLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsbUJBQUEsYUFBYSxFQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2hIO0lBQ0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7O1FBR3ZDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGdCQUFnQixHQUFHLENBQUMsQ0FBQzs7OztRQUk3RyxHQUFHLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7O1FBRXBELGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBUyxlQUFpQixDQUFDLENBQUM7O1FBQzlELGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBUyxlQUFlLFVBQU8sQ0FBQyxDQUFDOztRQUNyRSxTQUFTLEdBQ1gsTUFBTSxHQUFHLENBQUMsbUJBQUEsYUFBYSxFQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxnQkFBZ0IsR0FBRyxnQkFBZ0I7SUFFN0Usd0VBQXdFO0lBQ3hFLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXBGLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztRQUNoQixHQUFDLElBQUksSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUM3QixHQUFDLE9BQU8sSUFBRyxFQUFFLENBQUMsa0VBQWtFOztXQUNqRixDQUFDO0lBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO0lBRW5DLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldENsaWVudFJlY3QsIGdldE91dGVyU2l6ZXMsIGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IERhdGEgfSBmcm9tICcuLi9tb2RlbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXJyb3coZGF0YTogRGF0YSkge1xuICBsZXQgdGFyZ2V0T2Zmc2V0cyA9IGRhdGEub2Zmc2V0cy50YXJnZXQ7XG4gIC8vIGlmIGFycm93RWxlbWVudCBpcyBhIHN0cmluZywgc3VwcG9zZSBpdCdzIGEgQ1NTIHNlbGVjdG9yXG4gIGNvbnN0IGFycm93RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZGF0YS5pbnN0YW5jZS50YXJnZXQucXVlcnlTZWxlY3RvcignLmFycm93Jyk7XG5cbiAgLy8gaWYgYXJyb3dFbGVtZW50IGlzIG5vdCBmb3VuZCwgZG9uJ3QgcnVuIHRoZSBtb2RpZmllclxuICBpZiAoIWFycm93RWxlbWVudCkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgY29uc3QgaXNWZXJ0aWNhbCA9IFsnbGVmdCcsICdyaWdodCddLmluZGV4T2YoZGF0YS5wbGFjZW1lbnQpICE9PSAtMTtcblxuICBjb25zdCBsZW4gPSBpc1ZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICBjb25zdCBzaWRlQ2FwaXRhbGl6ZWQgPSBpc1ZlcnRpY2FsID8gJ1RvcCcgOiAnTGVmdCc7XG4gIGNvbnN0IHNpZGUgPSBzaWRlQ2FwaXRhbGl6ZWQudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgYWx0U2lkZSA9IGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcbiAgY29uc3Qgb3BTaWRlID0gaXNWZXJ0aWNhbCA/ICdib3R0b20nIDogJ3JpZ2h0JztcbiAgY29uc3QgYXJyb3dFbGVtZW50U2l6ZSA9IGdldE91dGVyU2l6ZXMoYXJyb3dFbGVtZW50KVtsZW5dO1xuXG4gIC8vIHRvcC9sZWZ0IHNpZGVcbiAgaWYgKGRhdGEub2Zmc2V0cy5ob3N0W29wU2lkZV0gLSBhcnJvd0VsZW1lbnRTaXplIDwgKHRhcmdldE9mZnNldHMgYXMgYW55KVtzaWRlXSkge1xuICAgICh0YXJnZXRPZmZzZXRzIGFzIGFueSlbc2lkZV0gLT1cbiAgICAgICh0YXJnZXRPZmZzZXRzIGFzIGFueSlbc2lkZV0gLSAoZGF0YS5vZmZzZXRzLmhvc3Rbb3BTaWRlXSAtIGFycm93RWxlbWVudFNpemUpO1xuICB9XG4gIC8vIGJvdHRvbS9yaWdodCBzaWRlXG4gIGlmIChOdW1iZXIoKGRhdGEgYXMgYW55KS5vZmZzZXRzLmhvc3Rbc2lkZV0pICsgTnVtYmVyKGFycm93RWxlbWVudFNpemUpID4gKHRhcmdldE9mZnNldHMgYXMgYW55KVtvcFNpZGVdKSB7XG4gICAgKHRhcmdldE9mZnNldHMgYXMgYW55KVtzaWRlXSArPVxuICAgICAgTnVtYmVyKChkYXRhIGFzIGFueSkub2Zmc2V0cy5ob3N0W3NpZGVdKSArIE51bWJlcihhcnJvd0VsZW1lbnRTaXplKSAtIE51bWJlcigodGFyZ2V0T2Zmc2V0cyBhcyBhbnkpW29wU2lkZV0pO1xuICB9XG4gIHRhcmdldE9mZnNldHMgPSBnZXRDbGllbnRSZWN0KHRhcmdldE9mZnNldHMpO1xuXG4gIC8vIGNvbXB1dGUgY2VudGVyIG9mIHRoZSB0YXJnZXRcbiAgY29uc3QgY2VudGVyID0gTnVtYmVyKChkYXRhIGFzIGFueSkub2Zmc2V0cy5ob3N0W3NpZGVdKSArIE51bWJlcihkYXRhLm9mZnNldHMuaG9zdFtsZW5dIC8gMiAtIGFycm93RWxlbWVudFNpemUgLyAyKTtcblxuICAvLyBDb21wdXRlIHRoZSBzaWRlVmFsdWUgdXNpbmcgdGhlIHVwZGF0ZWQgdGFyZ2V0IG9mZnNldHNcbiAgLy8gdGFrZSB0YXJnZXQgbWFyZ2luIGluIGFjY291bnQgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIHRoaXMgaW5mbyBhdmFpbGFibGVcbiAgY29uc3QgY3NzID0gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGRhdGEuaW5zdGFuY2UudGFyZ2V0KTtcblxuICBjb25zdCB0YXJnZXRNYXJnaW5TaWRlID0gcGFyc2VGbG9hdChjc3NbYG1hcmdpbiR7c2lkZUNhcGl0YWxpemVkfWBdKTtcbiAgY29uc3QgdGFyZ2V0Qm9yZGVyU2lkZSA9IHBhcnNlRmxvYXQoY3NzW2Bib3JkZXIke3NpZGVDYXBpdGFsaXplZH1XaWR0aGBdKTtcbiAgbGV0IHNpZGVWYWx1ZSA9XG4gICAgY2VudGVyIC0gKHRhcmdldE9mZnNldHMgYXMgYW55KVtzaWRlXSAtIHRhcmdldE1hcmdpblNpZGUgLSB0YXJnZXRCb3JkZXJTaWRlO1xuXG4gIC8vIHByZXZlbnQgYXJyb3dFbGVtZW50IGZyb20gYmVpbmcgcGxhY2VkIG5vdCBjb250aWd1b3VzbHkgdG8gaXRzIHRhcmdldFxuICBzaWRlVmFsdWUgPSBNYXRoLm1heChNYXRoLm1pbih0YXJnZXRPZmZzZXRzW2xlbl0gLSBhcnJvd0VsZW1lbnRTaXplLCBzaWRlVmFsdWUpLCAwKTtcblxuICBkYXRhLm9mZnNldHMuYXJyb3cgPSB7XG4gICAgW3NpZGVdOiBNYXRoLnJvdW5kKHNpZGVWYWx1ZSksXG4gICAgW2FsdFNpZGVdOiAnJyAvLyBtYWtlIHN1cmUgdG8gdW5zZXQgYW55IGV2ZW50dWFsIGFsdFNpZGUgdmFsdWUgZnJvbSB0aGUgRE9NIG5vZGVcbiAgfTtcblxuICBkYXRhLmluc3RhbmNlLmFycm93ID0gYXJyb3dFbGVtZW50O1xuXG4gIHJldHVybiBkYXRhO1xufVxuIl19