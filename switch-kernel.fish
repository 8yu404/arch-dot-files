#!/usr/bin/env fish

sudo nvim /etc/mkinitcpio.d/linux-mainline.preset

sudo mkinitcpio -P

set EFI_PART $(findmnt -no source /efi)
set EFI_DISK $(lsblk -no PKNAME "$EFI_PART")
set EFI_PART_NUM $(echo "EFI_PART" | grep -o '[0-9]*$')
sudo efibootmgr --create --disk /dev/{$EFI_DISK} --part {$EFI_PART_NUM} --label "ArchLinux-linux" --loader "EFI\\Linux\\ArchLinux-linux.efi" --quiet --unicode
sudo efibootmgr --create --disk /dev/{$EFI_DISK} --part {$EFI_PART_NUM} --label "ArchLinux-linux-fallback" --loader "EFI\\Linux\\ArchLinux-linux-fallback.efi" --quiet --unicode
sudo efibootmgr
sudo efibootmgr --bootnum 0000 --delete-bootnum
sudo efibootmgr --bootorder 0001,0002

sudo rm -rf /etc/mkinitcpio.d/linux-zen.preset