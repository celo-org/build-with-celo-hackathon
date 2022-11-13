import {
  Box,
  FormLabel,
  Input,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { uploadIcon } from "../assets/svgs/svg";
import CustomButton from "../components/CustomButton/customButton";
import AuthNav from "../components/Navbar/AuthNav";
import { auth, db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { toaster } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import {
  query,
  collection,
  doc,
  updateDoc,
  getDocs,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const UploadVideo = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [vidUrl, setVidUrl] = useState(null);
  const [imgurl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [filePath, setFilePath] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [myTrees, setMyTrees] = useState([]);
  const [imgProgressPercent, setImgProgressPercent] = useState(0);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
    } catch (error) {
      toaster.danger("An error occured while fetching user data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filePath) return;

    const storageRef = ref(storage, `files/${filePath.name}`);
    const uploadTask = uploadBytesResumable(storageRef, filePath);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        toaster.danger(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVidUrl(downloadURL);
        });
      }
    );
  };

  const handleUploadImg = async (e) => {
    e.preventDefault();
    if (!imagePath) return;

    const storeImageRef = ref(storage, `files/${imagePath.name}`);
    const uploadImageTask = uploadBytesResumable(storeImageRef, imagePath);

    uploadImageTask.on(
      "state_changed",
      (snapshot) => {
        const imgProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setImgProgressPercent(imgProgress);
      },
      (error) => {
        toaster.danger(error);
      },
      () => {
        getDownloadURL(uploadImageTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          toaster.success("Image uploaded successfully");
        });
      }
    );
  };

  useEffect(() => {
    fetchUserName();
  }, [user, loading]);
  useEffect(() => {
    const q = query(collection(db, "plantTrees"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setMyTrees(
        querySnapshot.docs.map((myTree) => ({
          id: myTree.id,
          data: myTree.data(),
        }))
      );
    });
  }, []);

  if (progresspercent === 100) {
    const treesDocRef = doc(db, "plantTrees", myTrees[0].id);
    try {
      updateDoc(treesDocRef, {
        videoUrl: vidUrl,
        imageUrl: imgurl
      });
      setTimeout(() => {
        navigate("/success");
      }, 2000);
    } catch (error) {
      toaster.danger(error);
    }
  }

  return (
    <Box>
      <AuthNav />

      <Box padding="30px" mx="50px">
        <Text fontSize="25px" fontWeight="normal">
          Upload your iamge and video here
        </Text>
      </Box>

      <SimpleGrid columns={2} padding="30px" mx="50px" w="80%" gap="80px">
        <Box>
          <FormLabel
            htmlFor="upload-img"
            p="30px"
            border="1px dashed #C4C4C4"
            textAlign="center"
            w="100%"
            cursor="pointer"
          >
            <Box mx="auto">{uploadIcon}</Box>
            <Text>Drag and drop your upload</Text>
            <Text>or</Text>
            <Text color="brand.orange">Browse files</Text>
          </FormLabel>
          <Input
            type="file"
            id="upload-img"
            accept="image/png, image/jpeg"
            onChange={(e) => setImagePath(e.target.files[0])}
          />
          <Box mt="20px">
            <CustomButton
              bg="brand.orange"
              color="brand.white"
              hoverBg="brand.lightGreen"
              mx="auto"
              w="100%"
              disabled={!imagePath}
              onClick={handleUploadImg}
            >
              <Text fontWeight="medium">
                {imgProgressPercent > 0 ? (
                  `${imgProgressPercent}%`
                ) : imgProgressPercent === 100 ? (
                  <Spinner />
                ) : (
                  "Upload Image"
                )}
              </Text>
            </CustomButton>
          </Box>
        </Box>

        <Box>
          <FormLabel
            htmlFor="upload-vid"
            p="30px"
            border="1px dashed #C4C4C4"
            textAlign="center"
            w="100%"
            cursor="pointer"
          >
            <Box mx="auto">{uploadIcon}</Box>
            <Text>Drag and drop your upload</Text>
            <Text>or</Text>
            <Text color="brand.orange">Browse files</Text>
          </FormLabel>
          <Input
            type="file"
            id="upload-vid"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={(e) => setFilePath(e.target.files[0])}
          />
          <Box mt="20px">
            <CustomButton
              bg="brand.orange"
              color="brand.white"
              hoverBg="brand.lightGreen"
              mx="auto"
              w="100%"
              disabled={!filePath}
              onClick={handleSubmit}
            >
              <Text fontWeight="medium">
                {progresspercent > 0 ? (
                  `${progresspercent}%`
                ) : progresspercent === 100 ? (
                  <Spinner />
                ) : (
                  "Submit Video"
                )}
              </Text>
            </CustomButton>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default UploadVideo;
