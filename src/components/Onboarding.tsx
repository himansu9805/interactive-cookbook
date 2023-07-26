import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, Checkbox, Chip, Divider, Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import { useUserContext } from "../contexts/UserContext";
import axios from 'axios';
import { supabase } from '../supabaseClient';


export default function Onboading({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

  const { user, setUser } = useUserContext();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDialogueOpen, setIsDialogueOpen] = React.useState(true);
  const [modalDescription, setModalDescription] = React.useState('You haven\'t selected any food preferences yet. Please select atleast 3 categories from the given options.');

  React.useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((res: any) => {
      setCategories(res.data.meals);
    }).catch((err: any) => console.log(err));

    if (user?.preferences?.length !== undefined && user?.preferences?.length > 0) {
      setSelected(user?.preferences);
      setModalDescription('Your selected any food preferences are following. You can update your preferences by selecting from following.');
    }
  }, []);

  async function pushData() {
    setIsUploading(true);
    await supabase.from(`users`).update({ preferences: selected }).eq('id', user!.id).then((res: any) => {
      console.log(res);
      setUser({ ...user!, preferences: selected });
      setIsModalOpen(false);
      setIsUploading(false);
    });
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isModalOpen}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <ModalClose onClick={() => setIsModalOpen(false)} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          Hey {user!.name}!
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          {modalDescription}
        </Typography>
        <Box sx={{ m: 2 }} />
        <Box
          role="group"
          aria-labelledby="fav-movie"
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
        >
          {categories.map((category) => {
            const checked = selected.includes(category.strCategory);
            return (
              <Chip

                key={category.strCategory}
                variant={checked ? 'soft' : 'plain'}
                color={checked ? 'primary' : 'neutral'}
                startDecorator={
                  checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                }
              >
                <Checkbox
                  variant="outlined"
                  color={checked ? 'primary' : 'neutral'}
                  disableIcon
                  overlay
                  label={category.strCategory}
                  checked={checked}
                  onChange={(event) => {
                    setSelected((selectedCategories) =>
                      !event.target.checked
                        ? selectedCategories.filter((n) => n !== category.strCategory)
                        : [...selectedCategories, category.strCategory],
                    );
                  }}
                />
              </Chip>
            );
          })}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button disabled={selected.length < 3 && !isUploading} type='submit' size='lg' onClick={pushData} loading={isUploading}>Save</Button>
        </Box>
      </Sheet>
    </Modal>
  )
}