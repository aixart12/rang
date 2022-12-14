import { useToast, UseToastOptions } from '@chakra-ui/react';
/* 
  hook to handle toast messages
  useToast is provided by @chakra-ui/react
  Using the same component with some app sepcific requirements
*/
export const useToastMessage = () => {
  const toast = useToast();
  /* 
    showToast is a function that takes a toast object as an argument
    and displays the toast message
    @Param toast: toast object
    @Param isError: boolean to indicate if the toast is an error
  */
  const showToast = (
    {
      title,
      status,
      description,
      position = 'bottom',
      duration = 5000,
    }: UseToastOptions,
    isCloseAlreadyOpened: boolean = true,
  ) => {
    if (isCloseAlreadyOpened) {
      toast.closeAll();
    }
    toast({
      title,
      status,
      description,
      position,
      duration,
      isClosable: true,
    });
  };
  return showToast;
};
