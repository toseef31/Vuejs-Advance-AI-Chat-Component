import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders title from props", () => {
    const wrapper = mount(HelloWorld, {});
    expect(wrapper.text()).toContain("testing data");
  });
});
