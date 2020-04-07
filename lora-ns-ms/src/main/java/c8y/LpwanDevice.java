package c8y;

public class LpwanDevice {
	public LpwanDevice() {}

	private boolean provisioned;

	public boolean isProvisioned() {
		return provisioned;
	}

	public void setProvisioned(boolean provisioned) {
		this.provisioned = provisioned;
	}
	
	public LpwanDevice provisioned(boolean provisioned) {
		this.setProvisioned(true);
		return this;
	}
}
