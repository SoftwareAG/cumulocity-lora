package lora.ns.liveobjects.rest.model;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@NoArgsConstructor
@AllArgsConstructor
@With
public class DataMessageFilter {
    private List<GroupPath> groupPaths = new ArrayList<>();
    private List<String> connectors = new ArrayList<>();
    private List<String> deviceIds = new ArrayList<>();
}
