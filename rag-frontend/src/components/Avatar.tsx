import styled from "styled-components";
import defaultAvatar from "../assets/account.png";

const Wrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceLight};
  margin: 0 auto ${({ theme }) => theme.spacing.xs};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface AvatarProps {
  src?: string;
  alt?: string;
}

export function Avatar({ src, alt }: AvatarProps) {
  return (
    <Wrapper>
      <Img
        src={src || defaultAvatar}
        alt={alt || "Avatar"}
        onError={(e) => {
          e.currentTarget.src = defaultAvatar;
        }}
      />
    </Wrapper>
  );
}
