package lora.codec;

public class Result<T> {
	private boolean success;
	private String message;
	private T response;
	
	public Result() {}
	public Result(boolean success, String message, T response) {
		super();
		this.success = success;
		this.message = message;
		this.response = response;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public T getResponse() {
		return response;
	}
	public void setResponse(T response) {
		this.response = response;
	}
}
