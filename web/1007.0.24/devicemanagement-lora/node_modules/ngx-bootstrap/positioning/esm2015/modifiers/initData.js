/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { computeAutoPlacement, getReferenceOffsets, getTargetOffsets } from '../utils';
/**
 * @param {?} targetElement
 * @param {?} hostElement
 * @param {?} position
 * @param {?} options
 * @return {?}
 */
export function initData(targetElement, hostElement, position, options) {
    /** @type {?} */
    const hostElPosition = getReferenceOffsets(targetElement, hostElement);
    if (!position.match(/^(auto)*\s*(left|right|top|bottom)*$/)
        && !position.match(/^(left|right|top|bottom)*\s*(start|end)*$/)) {
        /* tslint:disable-next-line: no-parameter-reassignment */
        position = 'auto';
    }
    /** @type {?} */
    const placementAuto = !!position.match(/auto/g);
    // support old placements 'auto left|right|top|bottom'
    /** @type {?} */
    let placement = position.match(/auto\s(left|right|top|bottom)/)
        ? position.split(' ')[1] || 'auto'
        : position;
    /** @type {?} */
    const targetOffset = getTargetOffsets(targetElement, hostElPosition, placement);
    placement = computeAutoPlacement(placement, hostElPosition, targetElement, hostElement, options ? options.allowedPositions : undefined);
    return {
        options,
        instance: {
            target: targetElement,
            host: hostElement,
            arrow: null
        },
        offsets: {
            target: targetOffset,
            host: hostElPosition,
            arrow: null
        },
        positionFixed: false,
        placement,
        placementAuto
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdERhdGEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nLyIsInNvdXJjZXMiOlsibW9kaWZpZXJzL2luaXREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDakIsTUFBTSxVQUFVLENBQUM7Ozs7Ozs7O0FBSWxCLE1BQU0sVUFBVSxRQUFRLENBQ3RCLGFBQTBCLEVBQUUsV0FBd0IsRUFBRSxRQUFnQixFQUFFLE9BQWdCOztVQUdsRixjQUFjLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQztJQUV0RSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQztXQUN0RCxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsMkNBQTJDLENBQUMsRUFBRTtRQUMvRCx5REFBeUQ7UUFDekQsUUFBUSxHQUFHLE1BQU0sQ0FBQztLQUNuQjs7VUFFRyxhQUFhLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDOzs7UUFHM0MsU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUM7UUFDN0QsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTTtRQUNsQyxDQUFDLENBQUMsUUFBUTs7VUFFTixZQUFZLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUM7SUFFL0UsU0FBUyxHQUFHLG9CQUFvQixDQUM5QixTQUFTLEVBQ1QsY0FBYyxFQUNkLGFBQWEsRUFDYixXQUFXLEVBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDL0MsQ0FBQztJQUVGLE9BQU87UUFDTCxPQUFPO1FBQ1AsUUFBUSxFQUFFO1lBQ1IsTUFBTSxFQUFFLGFBQWE7WUFDckIsSUFBSSxFQUFFLFdBQVc7WUFDakIsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNELE9BQU8sRUFBRTtZQUNQLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLElBQUksRUFBRSxjQUFjO1lBQ3BCLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRCxhQUFhLEVBQUUsS0FBSztRQUNwQixTQUFTO1FBQ1QsYUFBYTtLQUNkLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgY29tcHV0ZUF1dG9QbGFjZW1lbnQsXG4gIGdldFJlZmVyZW5jZU9mZnNldHMsXG4gIGdldFRhcmdldE9mZnNldHNcbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5pbXBvcnQgeyBEYXRhLCBPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXREYXRhKFxuICB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCwgaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwb3NpdGlvbjogc3RyaW5nLCBvcHRpb25zOiBPcHRpb25zXG4pOiBEYXRhIHtcblxuICBjb25zdCBob3N0RWxQb3NpdGlvbiA9IGdldFJlZmVyZW5jZU9mZnNldHModGFyZ2V0RWxlbWVudCwgaG9zdEVsZW1lbnQpO1xuXG4gIGlmICghcG9zaXRpb24ubWF0Y2goL14oYXV0bykqXFxzKihsZWZ0fHJpZ2h0fHRvcHxib3R0b20pKiQvKVxuICAgICYmICFwb3NpdGlvbi5tYXRjaCgvXihsZWZ0fHJpZ2h0fHRvcHxib3R0b20pKlxccyooc3RhcnR8ZW5kKSokLykpIHtcbiAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tcGFyYW1ldGVyLXJlYXNzaWdubWVudCAqL1xuICAgICAgcG9zaXRpb24gPSAnYXV0byc7XG4gICAgfVxuXG4gIGNvbnN0IHBsYWNlbWVudEF1dG8gPSAhIXBvc2l0aW9uLm1hdGNoKC9hdXRvL2cpO1xuXG4gIC8vIHN1cHBvcnQgb2xkIHBsYWNlbWVudHMgJ2F1dG8gbGVmdHxyaWdodHx0b3B8Ym90dG9tJ1xuICBsZXQgcGxhY2VtZW50ID0gcG9zaXRpb24ubWF0Y2goL2F1dG9cXHMobGVmdHxyaWdodHx0b3B8Ym90dG9tKS8pXG4gICAgPyBwb3NpdGlvbi5zcGxpdCgnICcpWzFdIHx8ICdhdXRvJ1xuICAgIDogcG9zaXRpb247XG5cbiAgY29uc3QgdGFyZ2V0T2Zmc2V0ID0gZ2V0VGFyZ2V0T2Zmc2V0cyh0YXJnZXRFbGVtZW50LCBob3N0RWxQb3NpdGlvbiwgcGxhY2VtZW50KTtcblxuICBwbGFjZW1lbnQgPSBjb21wdXRlQXV0b1BsYWNlbWVudChcbiAgICBwbGFjZW1lbnQsXG4gICAgaG9zdEVsUG9zaXRpb24sXG4gICAgdGFyZ2V0RWxlbWVudCxcbiAgICBob3N0RWxlbWVudCxcbiAgICBvcHRpb25zID8gb3B0aW9ucy5hbGxvd2VkUG9zaXRpb25zIDogdW5kZWZpbmVkXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBvcHRpb25zLFxuICAgIGluc3RhbmNlOiB7XG4gICAgICB0YXJnZXQ6IHRhcmdldEVsZW1lbnQsXG4gICAgICBob3N0OiBob3N0RWxlbWVudCxcbiAgICAgIGFycm93OiBudWxsXG4gICAgfSxcbiAgICBvZmZzZXRzOiB7XG4gICAgICB0YXJnZXQ6IHRhcmdldE9mZnNldCxcbiAgICAgIGhvc3Q6IGhvc3RFbFBvc2l0aW9uLFxuICAgICAgYXJyb3c6IG51bGxcbiAgICB9LFxuICAgIHBvc2l0aW9uRml4ZWQ6IGZhbHNlLFxuICAgIHBsYWNlbWVudCxcbiAgICBwbGFjZW1lbnRBdXRvXG4gIH07XG59XG4iXX0=