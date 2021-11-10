import {IMeasurementCreate, IEvent, IAlarm, IManagedObject, Severity} from '@c8y/client';

export class C8YData {
	measurements: Partial<IMeasurementCreate>[] = [];
	events: IEvent[] = [];
	alarms: IAlarm[] = [];
	alarmsToClear: string[] = [];
	morToUpdate?: IManagedObject;
	
	addMeasurement(mor: IManagedObject, fragment: string, series: string, unit: string, value: number, time: Date) {
		let m: Partial<IMeasurementCreate> = {
            sourceId: mor.id,
            type: fragment,
            time: time
        };

        m[fragment] = {};
        m[fragment][series] = {"value": value, "unit": unit};

		this.measurements.push(m);
	}
	
	addMeasurements(mor: IManagedObject, fragment: string, serieses: string[], units: string[], values: number[], time: Date) {
		let m: Partial<IMeasurementCreate> = {
            sourceId: mor.id,
            type: fragment,
            time: time
        };

        m[fragment] = {}
        for(let i=0;i<serieses.length;i++) {
            m[fragment][serieses[i]] = {"value": values[i], "unit": units[i]};
        }

		this.measurements.push(m);
	}

	addEvent(mor:IManagedObject, eventType: string, eventText: string, properties: {}, dateTime: Date) {
        let event: IEvent = {
            source: {
                id: mor.id
            },
            type: eventType,
            text: eventText,
            time: dateTime.toISOString()
        };
        if (properties) {
            Object.assign(event, properties);
        }
        
        this.events.push(event);
    }

	addAlarm(mor: IManagedObject, alarmType: string, alarmText: string, severity: Severity, dateTime: Date) {
        let alarm: IAlarm = {
            source: {
                id: mor.id
            },
            time: dateTime.toISOString(),
            text: alarmText,
            type: alarmType,
            severity: severity
        };
        
        this.alarms.push(alarm);
	}

	clearAlarm(alarmType: string) {
		this.alarmsToClear.push(alarmType);
	}
}