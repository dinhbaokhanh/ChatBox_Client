import { keyframes, Skeleton, styled } from '@mui/material'
import { Link as LinkComponent } from 'react-router-dom'
import { gray } from '../../constants/color'

export const VisuallyHiddenInput = styled('input')({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
})

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: #f0f0f0;
  }
`
export const InputBox = styled('input')`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: ${gray};
`
export const SearchField = styled('input')`
  padding: 0.8rem 1.5rem;
  width: 22vmax;
  border: 2px solid transparent;
  border-radius: 2rem;
  background-color: #f1f1f1;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  outline: none;

  &:focus {
    border-color: rgb(101, 101, 101); /* Màu nâu cà phê nhẹ */
    background-color: #fff;
    box-shadow: 0 0 8px rgba(103, 103, 103, 0.5);
  }

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }
`
export const CurveButton = styled('button')`
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: rgba(67, 57, 57, 0.2);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
`

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-5px);
    opacity: 1;
  }
`

export const BouncingSkeleton = styled(Skeleton)(({ delay }) => ({
  animation: `${bounce} 1s infinite ease-in-out`,
  animationDelay: delay,
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: 'gray',
}))
