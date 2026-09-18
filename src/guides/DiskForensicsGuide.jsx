import ReferenceGuide from '../components/ReferenceGuide'

export default function DiskForensicsGuide() {
  return (
    <ReferenceGuide
      title="Disk & File Forensics — Autopsy"
      intro="The GUI front-end for The Sleuth Kit — full disk-image analysis rather than live memory."
      sections={[
        {
          heading: 'Typical workflow',
          list: [
            'New Case → give it a name and a directory.',
            'Add Data Source → point it at the disk image (.E01, .dd, .img, .vmdk) or a local drive/folder.',
            'Let the ingest modules run — at minimum enable Hash Lookup, File Type Identification, Keyword Search, and Recent Activity.',
            'Browse results: Data Sources → Views → Deleted Files, File Types → By Extension, or Results → Extracted Content.',
            'Use the Keyword Search tab any time to full-text search the whole image, including inside many file formats and slack space.',
          ],
        },
        {
          heading: "CLI equivalents (The Sleuth Kit, if you don't have the GUI)",
          code: `mmls disk.img                # List partitions in an image
fls -r -o <offset> disk.img  # Recursively list files (including deleted) in a partition
icat -o <offset> disk.img <inode> > recovered_file
                              # Extract a file by inode number`,
        },
        {
          heading: 'Worked example',
          paragraphs: ["A challenge gives you a disk image and says the flag was in a deleted file:"],
          list: [
            'Add the image to a new Autopsy case, run ingest with Keyword Search on.',
            'Go to Data Sources → Views → File Types → Deleted Files.',
            "Sort by name/date, open suspicious files in the built-in viewer, or export and run strings / grep 'flag{' on them locally.",
          ],
        },
      ]}
    />
  )
}
