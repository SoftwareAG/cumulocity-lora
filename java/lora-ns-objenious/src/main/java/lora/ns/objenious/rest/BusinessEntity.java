package lora.ns.objenious.rest;

import java.util.Objects;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * BusinessEntity
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-12-13T14:17:01.165Z")

public class BusinessEntity {
  @JsonProperty("id")
  private Integer id = null;

  @JsonProperty("link")
  private String link = null;

  @JsonProperty("name")
  private String name = null;

  @JsonProperty("primary_color")
  private String primaryColor = null;

  @JsonProperty("secondary_color")
  private String secondaryColor = null;

  @JsonProperty("navbar_color")
  private String navbarColor = null;

  @JsonProperty("customer_reference")
  private String customerReference = null;

  @JsonProperty("logo")
  private String logo = null;

  @JsonProperty("allowed_packs")
  private AllowedPackList allowedPacks = null;

  public BusinessEntity id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Business entity identifier
   * 
   * @return id
   **/

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public BusinessEntity link(String link) {
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

  public BusinessEntity name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Business entity name
   * 
   * @return name
   **/

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public BusinessEntity primaryColor(String primaryColor) {
    this.primaryColor = primaryColor;
    return this;
  }

  /**
   * Color to custom the header and menu of SPOT (hex)
   * 
   * @return primaryColor
   **/

  public String getPrimaryColor() {
    return primaryColor;
  }

  public void setPrimaryColor(String primaryColor) {
    this.primaryColor = primaryColor;
  }

  public BusinessEntity secondaryColor(String secondaryColor) {
    this.secondaryColor = secondaryColor;
    return this;
  }

  /**
   * Color to custom the buttons of SPOT (hex)
   * 
   * @return secondaryColor
   **/

  public String getSecondaryColor() {
    return secondaryColor;
  }

  public void setSecondaryColor(String secondaryColor) {
    this.secondaryColor = secondaryColor;
  }

  public BusinessEntity navbarColor(String navbarColor) {
    this.navbarColor = navbarColor;
    return this;
  }

  /**
   * Color to custom the navbar of SPOT (hex)
   * 
   * @return navbarColor
   **/

  public String getNavbarColor() {
    return navbarColor;
  }

  public void setNavbarColor(String navbarColor) {
    this.navbarColor = navbarColor;
  }

  public BusinessEntity customerReference(String customerReference) {
    this.customerReference = customerReference;
    return this;
  }

  /**
   * The id on the client platform
   * 
   * @return customerReference
   **/

  public String getCustomerReference() {
    return customerReference;
  }

  public void setCustomerReference(String customerReference) {
    this.customerReference = customerReference;
  }

  public BusinessEntity logo(String logo) {
    this.logo = logo;
    return this;
  }

  /**
   * URL of the logo
   * 
   * @return logo
   **/

  public String getLogo() {
    return logo;
  }

  public void setLogo(String logo) {
    this.logo = logo;
  }

  public BusinessEntity allowedPacks(AllowedPackList allowedPacks) {
    this.allowedPacks = allowedPacks;
    return this;
  }

  /**
   * Get allowedPacks
   * 
   * @return allowedPacks
   **/

  public AllowedPackList getAllowedPacks() {
    return allowedPacks;
  }

  public void setAllowedPacks(AllowedPackList allowedPacks) {
    this.allowedPacks = allowedPacks;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BusinessEntity businessEntity = (BusinessEntity) o;
    return Objects.equals(this.id, businessEntity.id) &&
        Objects.equals(this.link, businessEntity.link) &&
        Objects.equals(this.name, businessEntity.name) &&
        Objects.equals(this.primaryColor, businessEntity.primaryColor) &&
        Objects.equals(this.secondaryColor, businessEntity.secondaryColor) &&
        Objects.equals(this.navbarColor, businessEntity.navbarColor) &&
        Objects.equals(this.customerReference, businessEntity.customerReference) &&
        Objects.equals(this.logo, businessEntity.logo) &&
        Objects.equals(this.allowedPacks, businessEntity.allowedPacks);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, link, name, primaryColor, secondaryColor, navbarColor, customerReference, logo,
        allowedPacks);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BusinessEntity {\n");

    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    link: ").append(toIndentedString(link)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    primaryColor: ").append(toIndentedString(primaryColor)).append("\n");
    sb.append("    secondaryColor: ").append(toIndentedString(secondaryColor)).append("\n");
    sb.append("    navbarColor: ").append(toIndentedString(navbarColor)).append("\n");
    sb.append("    customerReference: ").append(toIndentedString(customerReference)).append("\n");
    sb.append("    logo: ").append(toIndentedString(logo)).append("\n");
    sb.append("    allowedPacks: ").append(toIndentedString(allowedPacks)).append("\n");
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
