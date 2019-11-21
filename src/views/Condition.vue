<template>
  <div>
    <navbar />

    <br />
    <b-button v-b-modal.addcondition style="background: #7FDBD5; border: #7FDBD5;">
      <span class="text-dark">Add new rule</span>
    </b-button>

    <b-modal centered scrollable no-close-on-backdrop id="addcondition" size="xl" title="Add new rule">
      <b-row class="m-2">
        <b-col cols="2">
          <label :for="name">Name</label>
        </b-col>
        <b-col>
          <b-form-input id="name" type="text"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="m-2">
        <b-col cols="2">T</b-col>
        <b-col cols="2">
          <b-dropdown text="Symbols" variant="outline-secondary">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Minimum"></b-form-input>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Maximum"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="m-2">
        <b-col cols="2">P</b-col>
        <b-col cols="2">
          <b-dropdown text="Symbols" variant="outline-secondary">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Minimum"></b-form-input>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Maximum"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="m-2">
        <b-col cols="2">R</b-col>
        <b-col cols="2">
          <b-dropdown text="Symbols" variant="outline-secondary">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Minimum"></b-form-input>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Maximum"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="m-2">
        <b-col cols="2">SBP</b-col>
        <b-col cols="2">
          <b-dropdown text="Symbols" variant="outline-secondary">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Minimum"></b-form-input>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Maximum"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="m-2">
        <b-col cols="2">DBP</b-col>
        <b-col cols="2">
          <b-dropdown text="Symbols" variant="outline-secondary">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Minimum"></b-form-input>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Maximum"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="m-2">
        <b-col cols="2">O2 Sat</b-col>
        <b-col cols="2">
          <b-dropdown text="Symbols" variant="outline-secondary">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Minimum"></b-form-input>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Maximum"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="m-2">
        <b-col cols="12" class="text-center">Coma Score</b-col>
        <b-col cols="4">
          <b-row>
            <b-col cols="12" class="text-center">E</b-col>
            <b-col cols="4">
              <b-dropdown text="Symbols" variant="outline-secondary">
                <b-dropdown-item href="#">Action</b-dropdown-item>
                <b-dropdown-item href="#">Another action</b-dropdown-item>
                <b-dropdown-item href="#">Something else here</b-dropdown-item>
              </b-dropdown>
            </b-col>
            <b-col cols="4">
              <b-form-input placeholder="Min"></b-form-input>
            </b-col>
            <b-col cols="4">
              <b-form-input placeholder="Max"></b-form-input>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="4">
          <b-row>
            <b-col cols="12" class="text-center">V</b-col>
            <b-col cols="4">
              <b-dropdown text="Symbols" variant="outline-secondary">
                <b-dropdown-item href="#">Action</b-dropdown-item>
                <b-dropdown-item href="#">Another action</b-dropdown-item>
                <b-dropdown-item href="#">Something else here</b-dropdown-item>
              </b-dropdown>
            </b-col>
            <b-col cols="4">
              <b-form-input placeholder="Min"></b-form-input>
            </b-col>
            <b-col cols="4">
              <b-form-input placeholder="Max"></b-form-input>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="4">
          <b-row>
            <b-col cols="12" class="text-center">M</b-col>
            <b-col cols="4">
              <b-dropdown text="Symbols" variant="outline-secondary">
                <b-dropdown-item href="#">Action</b-dropdown-item>
                <b-dropdown-item href="#">Another action</b-dropdown-item>
                <b-dropdown-item href="#">Something else here</b-dropdown-item>
              </b-dropdown>
            </b-col>
            <b-col cols="4">
              <b-form-input placeholder="Min"></b-form-input>
            </b-col>
            <b-col cols="4">
              <b-form-input placeholder="Max"></b-form-input>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="m-2">
        <b-col cols="2">Urine</b-col>
        <b-col cols="2">
          <b-dropdown text="Symbols" variant="outline-secondary">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Minimum"></b-form-input>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Maximum"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="m-2">
        <b-col cols="2">Pain score</b-col>
        <b-col cols="2">
          <b-dropdown text="Symbols" variant="outline-secondary">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Minimum"></b-form-input>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Maximum"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="m-2">
        <b-col cols="2">Fallrisk</b-col>
        <b-col cols="2">
          <b-dropdown text="Symbols" variant="outline-secondary">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Minimum"></b-form-input>
        </b-col>
        <b-col cols="4">
          <b-form-input placeholder="Maximum"></b-form-input>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import navbar from "@/components/NavbarHome.vue";
export default {
  components: {
    navbar
  }
};
</script>

<style scoped>
</style>