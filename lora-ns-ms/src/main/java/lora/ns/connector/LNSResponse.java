package lora.ns.connector;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LNSResponse<T> {
    @With private String message;
    @With private boolean ok;
    @With private T result;
}
