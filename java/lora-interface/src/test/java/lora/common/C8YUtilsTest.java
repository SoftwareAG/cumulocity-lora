package lora.common;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.cumulocity.microservice.subscription.service.MicroserviceSubscriptionsService;
import com.cumulocity.model.ID;
import com.cumulocity.model.idtype.GId;
import com.cumulocity.rest.representation.identity.ExternalIDRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.sdk.client.SDKException;
import com.cumulocity.sdk.client.identity.IdentityApi;
import com.cumulocity.sdk.client.inventory.InventoryApi;

@ExtendWith(MockitoExtension.class)
class C8YUtilsTest {

    private static final ManagedObjectRepresentation device = createDevice();
    private static final ExternalIDRepresentation extId = createExtId();
    private static final String DEVICE_ID = "device_id";
    private static final String DEV_EUI = "device_eui";

    @Mock
    private InventoryApi inventoryApi;

    @Mock
    private IdentityApi identityApi;

    @Mock
    private MicroserviceSubscriptionsService subscriptionsService;

    @InjectMocks
    private C8YUtils c8yUtils;

    @Test
    void test_findExternalId_extId_does_not_exist() {
        when(identityApi.getExternalId(new ID(C8YUtils.DEVEUI_TYPE, DEV_EUI)))
                        .thenThrow(new SDKException(404, "ExternalId does not exist."));
        var result = c8yUtils.findExternalId(DEV_EUI, C8YUtils.DEVEUI_TYPE);
        assertThat(result).isEmpty();
    }

    @Test
    void test_getOrCreateDevice_device_does_not_exist() {
        when(identityApi.getExternalId(new ID(C8YUtils.DEVEUI_TYPE, DEV_EUI)))
                        .thenThrow(new SDKException(404, "ExternalId does not exist."));
        when(identityApi.create(any(ExternalIDRepresentation.class))).thenReturn(extId);
        when(inventoryApi.create(any(ManagedObjectRepresentation.class))).thenReturn(device);
        var result = c8yUtils.getOrCreateDevice(DEV_EUI, new ManagedObjectRepresentation());
        assertThat(result.getId().getValue()).isEqualTo(DEVICE_ID);
        verify(identityApi, times(1)).create(any(ExternalIDRepresentation.class));
    }

    private static ManagedObjectRepresentation createDevice() {
        var device = new ManagedObjectRepresentation();
        device.setId(GId.asGId(DEVICE_ID));
        return device;
    }

    private static ExternalIDRepresentation createExtId() {
        var extId = new ExternalIDRepresentation();
        extId.setExternalId(DEV_EUI);
        extId.setType(C8YUtils.DEVEUI_TYPE);
        extId.setManagedObject(device);
        return extId;
    }
}
