package lora.ns.objenious.rest;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.validation.annotation.Validated;

/**
 * Profile
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Profile {
	@JsonProperty("id")
	private Integer id = null;

	@JsonProperty("link")
	private String link = null;

	@JsonProperty("name")
	private String name = null;

	@JsonProperty("icon")
	private String icon = null;

	@JsonProperty("icon_name")
	private String iconName = null;

	public Profile id(Integer id) {
		this.id = id;
		return this;
	}

	/**
	 * Profile identifier
	 * 
	 * @return id
	 **/

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Profile link(String link) {
		this.link = link;
		return this;
	}

	/**
	 * URL of ressource
	 * 
	 * @return link
	 **/

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Profile name(String name) {
		this.name = name;
		return this;
	}

	/**
	 * Profile name
	 * 
	 * @return name
	 **/

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Profile icon(String icon) {
		this.icon = icon;
		return this;
	}

	/**
	 * Icon uri
	 * 
	 * @return icon
	 **/

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getIconName() {
		return iconName;
	}

	public void setIconName(String iconName) {
		this.iconName = iconName;
	}

	@Override
	public boolean equals(java.lang.Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Profile profile = (Profile) o;
		return Objects.equals(this.id, profile.id) && Objects.equals(this.link, profile.link)
				&& Objects.equals(this.name, profile.name) && Objects.equals(this.icon, profile.icon);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, link, name, icon);
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("class Profile {\n");

		sb.append("    id: ").append(toIndentedString(id)).append("\n");
		sb.append("    link: ").append(toIndentedString(link)).append("\n");
		sb.append("    name: ").append(toIndentedString(name)).append("\n");
		sb.append("    icon: ").append(toIndentedString(icon)).append("\n");
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
