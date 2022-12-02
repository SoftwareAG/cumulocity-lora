package lora.ns.objenious.rest;

import java.time.OffsetDateTime;
import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Alert
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class Alert {
	@JsonProperty("id")
	private String id = null;

	@JsonProperty("group")
	private Ref group = null;

	@JsonProperty("scenario")
	private Ref scenario = null;

	@JsonProperty("device")
	private Ref device = null;

	@JsonProperty("profile")
	private Ref profile = null;

	@JsonProperty("category")
	private String category = null;

	/**
	 * the level of criticity (critical, major, minor) of the alert
	 */
	public enum LevelEnum {
		CRITICAL("critical"),

		MAJOR("major"),

		MINOR("minor");

		private String value;

		LevelEnum(String value) {
			this.value = value;
		}

		@Override
		@JsonValue
		public String toString() {
			return String.valueOf(value);
		}

		@JsonCreator
		public static LevelEnum fromValue(String text) {
			for (LevelEnum b : LevelEnum.values()) {
				if (String.valueOf(b.value).equals(text)) {
					return b;
				}
			}
			return null;
		}
	}

	@JsonProperty("level")
	private LevelEnum level = null;

	@JsonProperty("title")
	private String title = null;

	@JsonProperty("start_at")
	private OffsetDateTime startAt = null;

	@JsonProperty("end_at")
	private OffsetDateTime endAt = null;

	/**
	 * The alert status
	 */
	public enum StateEnum {
		OPEN("open"),

		CLOSED("closed"),

		OPEN_ACKNOWLEDGED("open_acknowledged"),

		CLOSED_ACKNOWLEDGED("closed_acknowledged");

		private String value;

		StateEnum(String value) {
			this.value = value;
		}

		@Override
		@JsonValue
		public String toString() {
			return String.valueOf(value);
		}

		@JsonCreator
		public static StateEnum fromValue(String text) {
			for (StateEnum b : StateEnum.values()) {
				if (String.valueOf(b.value).equals(text)) {
					return b;
				}
			}
			return null;
		}
	}

	@JsonProperty("state")
	private StateEnum state = null;

	@JsonProperty("acknowledged")
	private Boolean acknowledged = null;

	@JsonProperty("acknowledged_at")
	private OffsetDateTime acknowledgedAt = null;

	@JsonProperty("measure")
	private Measure measure = null;

	@JsonProperty("type")
	private String type = null;

	public Alert id(String id) {
		this.id = id;
		return this;
	}

	/**
	 * Alert identifier
	 * 
	 * @return id
	 **/

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Alert group(Ref group) {
		this.group = group;
		return this;
	}

	/**
	 * Get group
	 * 
	 * @return group
	 **/

	public Ref getGroup() {
		return group;
	}

	public void setGroup(Ref group) {
		this.group = group;
	}

	public Alert scenario(Ref scenario) {
		this.scenario = scenario;
		return this;
	}

	/**
	 * Get scenario
	 * 
	 * @return scenario
	 **/

	public Ref getScenario() {
		return scenario;
	}

	public void setScenario(Ref scenario) {
		this.scenario = scenario;
	}

	public Alert device(Ref device) {
		this.device = device;
		return this;
	}

	/**
	 * Get device
	 * 
	 * @return device
	 **/

	public Ref getDevice() {
		return device;
	}

	public void setDevice(Ref device) {
		this.device = device;
	}

	public Alert profile(Ref profile) {
		this.profile = profile;
		return this;
	}

	/**
	 * Get profile
	 * 
	 * @return profile
	 **/

	public Ref getProfile() {
		return profile;
	}

	public void setProfile(Ref profile) {
		this.profile = profile;
	}

	public Alert category(String category) {
		this.category = category;
		return this;
	}

	/**
	 * The alert category
	 * 
	 * @return category
	 **/

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Alert level(LevelEnum level) {
		this.level = level;
		return this;
	}

	/**
	 * the level of criticity (critical, major, minor) of the alert
	 * 
	 * @return level
	 **/

	public LevelEnum getLevel() {
		return level;
	}

	public void setLevel(LevelEnum level) {
		this.level = level;
	}

	public Alert title(String title) {
		this.title = title;
		return this;
	}

	/**
	 * Get title
	 * 
	 * @return title
	 **/

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Alert startAt(OffsetDateTime startAt) {
		this.startAt = startAt;
		return this;
	}

	/**
	 * Get startAt
	 * 
	 * @return startAt
	 **/

	public OffsetDateTime getStartAt() {
		return startAt;
	}

	public void setStartAt(OffsetDateTime startAt) {
		this.startAt = startAt;
	}

	public Alert endAt(OffsetDateTime endAt) {
		this.endAt = endAt;
		return this;
	}

	/**
	 * Get endAt
	 * 
	 * @return endAt
	 **/

	public OffsetDateTime getEndAt() {
		return endAt;
	}

	public void setEndAt(OffsetDateTime endAt) {
		this.endAt = endAt;
	}

	public Alert state(StateEnum state) {
		this.state = state;
		return this;
	}

	/**
	 * The alert status
	 * 
	 * @return state
	 **/

	public StateEnum getState() {
		return state;
	}

	public void setState(StateEnum state) {
		this.state = state;
	}

	public Alert acknowledged(Boolean acknowledged) {
		this.acknowledged = acknowledged;
		return this;
	}

	/**
	 * Get acknowledged
	 * 
	 * @return acknowledged
	 **/

	public Boolean isAcknowledged() {
		return acknowledged;
	}

	public void setAcknowledged(Boolean acknowledged) {
		this.acknowledged = acknowledged;
	}

	public Alert acknowledgedAt(OffsetDateTime acknowledgedAt) {
		this.acknowledgedAt = acknowledgedAt;
		return this;
	}

	/**
	 * Get acknowledgedAt
	 * 
	 * @return acknowledgedAt
	 **/

	public OffsetDateTime getAcknowledgedAt() {
		return acknowledgedAt;
	}

	public void setAcknowledgedAt(OffsetDateTime acknowledgedAt) {
		this.acknowledgedAt = acknowledgedAt;
	}

	public Alert measure(Measure measure) {
		this.measure = measure;
		return this;
	}

	/**
	 * Get measure
	 * 
	 * @return measure
	 **/

	public Measure getMeasure() {
		return measure;
	}

	public void setMeasure(Measure measure) {
		this.measure = measure;
	}

	public Alert type(String type) {
		this.type = type;
		return this;
	}

	/**
	 * The alert type
	 * 
	 * @return type
	 **/

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public boolean equals(java.lang.Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Alert alert = (Alert) o;
		return Objects.equals(this.id, alert.id) && Objects.equals(this.group, alert.group)
				&& Objects.equals(this.scenario, alert.scenario) && Objects.equals(this.device, alert.device)
				&& Objects.equals(this.profile, alert.profile) && Objects.equals(this.category, alert.category)
				&& Objects.equals(this.level, alert.level) && Objects.equals(this.title, alert.title)
				&& Objects.equals(this.startAt, alert.startAt) && Objects.equals(this.endAt, alert.endAt)
				&& Objects.equals(this.state, alert.state) && Objects.equals(this.acknowledged, alert.acknowledged)
				&& Objects.equals(this.acknowledgedAt, alert.acknowledgedAt)
				&& Objects.equals(this.measure, alert.measure) && Objects.equals(this.type, alert.type);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, group, scenario, device, profile, category, level, title, startAt, endAt, state,
				acknowledged, acknowledgedAt, measure, type);
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("class Alert {\n");

		sb.append("    id: ").append(toIndentedString(id)).append("\n");
		sb.append("    group: ").append(toIndentedString(group)).append("\n");
		sb.append("    scenario: ").append(toIndentedString(scenario)).append("\n");
		sb.append("    device: ").append(toIndentedString(device)).append("\n");
		sb.append("    profile: ").append(toIndentedString(profile)).append("\n");
		sb.append("    category: ").append(toIndentedString(category)).append("\n");
		sb.append("    level: ").append(toIndentedString(level)).append("\n");
		sb.append("    title: ").append(toIndentedString(title)).append("\n");
		sb.append("    startAt: ").append(toIndentedString(startAt)).append("\n");
		sb.append("    endAt: ").append(toIndentedString(endAt)).append("\n");
		sb.append("    state: ").append(toIndentedString(state)).append("\n");
		sb.append("    acknowledged: ").append(toIndentedString(acknowledged)).append("\n");
		sb.append("    acknowledgedAt: ").append(toIndentedString(acknowledgedAt)).append("\n");
		sb.append("    measure: ").append(toIndentedString(measure)).append("\n");
		sb.append("    type: ").append(toIndentedString(type)).append("\n");
		sb.append("}");
		return sb.toString();
	}

	/**
	 * Convert the given object to string with each line indented by 4 spaces
	 * (except the first line).
	 */
	private String toIndentedString(java.lang.Object o) {
		if (o == null) {
			return "null";
		}
		return o.toString().replace("\n", "\n    ");
	}
}
