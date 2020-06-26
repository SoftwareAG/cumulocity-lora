package lora.ns.orbiwise.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Application {
	private String accountid;
	private String app_uuid;
	private boolean can_register;
	private boolean can_access_gtw_info;
	private boolean can_own_gtw;
	private boolean can_add_gtw;
	private boolean can_mng_gtw;
	private boolean loraloc_enable;
	
	public Application() {};
	
	public Application(String accountid, String app_uuid, boolean can_register, boolean can_access_gtw_info,
			boolean can_own_gtw, boolean can_add_gtw, boolean can_mng_gtw, boolean loraloc_enable) {
		super();
		this.accountid = accountid;
		this.app_uuid = app_uuid;
		this.can_register = can_register;
		this.can_access_gtw_info = can_access_gtw_info;
		this.can_own_gtw = can_own_gtw;
		this.can_add_gtw = can_add_gtw;
		this.can_mng_gtw = can_mng_gtw;
		this.loraloc_enable = loraloc_enable;
	}
	public String getAccountid() {
		return accountid;
	}
	public void setAccountid(String accountid) {
		this.accountid = accountid;
	}
	public String getApp_uuid() {
		return app_uuid;
	}
	public void setApp_uuid(String app_uuid) {
		this.app_uuid = app_uuid;
	}
	public boolean isCan_register() {
		return can_register;
	}
	public void setCan_register(boolean can_register) {
		this.can_register = can_register;
	}
	public boolean isCan_access_gtw_info() {
		return can_access_gtw_info;
	}
	public void setCan_access_gtw_info(boolean can_access_gtw_info) {
		this.can_access_gtw_info = can_access_gtw_info;
	}
	public boolean isCan_own_gtw() {
		return can_own_gtw;
	}
	public void setCan_own_gtw(boolean can_own_gtw) {
		this.can_own_gtw = can_own_gtw;
	}
	public boolean isCan_add_gtw() {
		return can_add_gtw;
	}
	public void setCan_add_gtw(boolean can_add_gtw) {
		this.can_add_gtw = can_add_gtw;
	}
	public boolean isCan_mng_gtw() {
		return can_mng_gtw;
	}
	public void setCan_mng_gtw(boolean can_mng_gtw) {
		this.can_mng_gtw = can_mng_gtw;
	}
	public boolean isLoraloc_enable() {
		return loraloc_enable;
	}
	public void setLoraloc_enable(boolean loraloc_enable) {
		this.loraloc_enable = loraloc_enable;
	}
}
