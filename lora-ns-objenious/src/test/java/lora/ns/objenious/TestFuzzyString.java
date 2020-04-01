package lora.ns.objenious;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import me.xdrop.fuzzywuzzy.FuzzySearch;

public class TestFuzzyString {
	@Test
	public void testFuzzyMaching() {
		int result = FuzzySearch.weightedRatio("Class'Air", "CO2 + T. Amb + Hygro - PYRESCOM - Class AIR");
		assertEquals(90, result);
		result = FuzzySearch.weightedRatio("PUL-LAB-13XS", "PULSE  - SENLAB - PUL-LAB- 41NS");
		assertEquals(86, result);
		result = FuzzySearch.weightedRatio("SENLAB", "PULSE  - SENLAB - PUL-LAB- 41NS");
		assertEquals(90, result);
		result = FuzzySearch. weightedRatio("tem-lab", "T. AMBIANTE - SENLAB - TEMp- LAB-41NS");
		assertEquals(86, result);
		result = FuzzySearch. partialRatio("50-70-012", "PULSE GAZ ATEX - NKE - 50-70-072");
		assertEquals(89, result);
	}
}
