import styled from "styled-components";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";
import { Fragment } from "react";
import useSWR from "swr";
import { useRouter } from "next/router.js";

export default function Comments({ id, locationName, comments }) {
  const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid black;
    border-radius: 0.8rem;
    padding: 0.5rem;
    text-align: center;
    p {
      border-bottom: solid 1px black;
      padding: 20px;
    }
  `;

  const { mutate } = useSWR(`/api/places/${id}`);

  const router = useRouter();
  console.log(id);

  async function handleSubmitComment(e) {
    e.preventDefault();
    console.log("submittest");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.placeId = id;
    console.log(data, "data");
    const response = await fetch(`/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("new comment added");
      mutate();
    }
  }

  return (
    <Article>
      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" />
        <Label htmlFor="comment">Your Comment</Label>
        <Input type="text" name="comment" placeholder="comment here..." />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
      {comments && (
        <>
          <h1> {comments.length} fans commented on this place:</h1>
          {comments.map(({ name, comment }, idx) => {
            return (
              <Fragment key={idx}>
                <p>
                  <small>
                    <strong>{name}</strong> commented on {locationName}
                  </small>
                </p>
                <span>{comment}</span>
              </Fragment>
            );
          })}
        </>
      )}
    </Article>
  );
}
