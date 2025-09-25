-- Create storage policies for the "Farmers Dashboard" bucket to allow file uploads

-- Policy for authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'Farmers Dashboard' 
  AND auth.uid() IS NOT NULL
);

-- Policy for authenticated users to view files they uploaded
CREATE POLICY "Users can view files in Farmers Dashboard bucket"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'Farmers Dashboard'
  AND auth.uid() IS NOT NULL
);

-- Policy for authenticated users to update/delete their files
CREATE POLICY "Users can update files in Farmers Dashboard bucket"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'Farmers Dashboard'
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can delete files in Farmers Dashboard bucket"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'Farmers Dashboard'
  AND auth.uid() IS NOT NULL
);