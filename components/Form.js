import styled from "styled-components";
import { StyledButton } from "./StyledButton.js";

export const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 3px solid black;
  border-radius: 0.5rem;
`;

export const Textarea = styled.textarea`
  font-family: inherit;
  border: 3px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export default function Form({ onSubmit, formName, defaultData }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("data", data);
    for (const element in data) {
      if (element !== "description") {
        const trimmedInput = data[element].trim();
        console.log("trimmedInput", trimmedInput);
        if (!trimmedInput) {
          alert("Please provide proper info for all input fields");
          return;
        }
      }
    }
    onSubmit(data);
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        required
        defaultValue={defaultData?.name}
        maxLength="30"
      />
      <Label htmlFor="image-url">
        Image Url(only{" "}
        <a href="https://unsplash.com/" target="_blank" rel="noreferrer">
          Unsplash
        </a>{" "}
        allowed)
      </Label>
      <Input
        id="image-url"
        name="image"
        type="text"
        required
        defaultValue={defaultData?.image}
      />
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        name="location"
        type="text"
        required
        defaultValue={defaultData?.location}
        maxLength="30"
      />
      <Label htmlFor="map-url">
        Map Url (only{" "}
        <a href="https://www.google.com/maps/" target="_blank" rel="noreferrer">
          GoogleMaps
        </a>{" "}
        allowed)
      </Label>
      <Input
        id="map-url"
        name="mapURL"
        type="text"
        required
        defaultValue={defaultData?.mapURL}
      />
      <Label htmlFor="description">Description (optional)</Label>
      <Textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        defaultValue={defaultData?.description}
        maxLength="300"
      ></Textarea>
      <StyledButton type="submit">
        {defaultData ? "Update place" : "Add place"}
      </StyledButton>
    </FormContainer>
  );
}
