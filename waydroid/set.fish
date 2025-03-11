mkdir lineage-20.0
cd lineage-20.0
repo init -u https://github.com/LineageOS/android.git -b lineage-20.0 --git-lfs
repo sync build/make
wget -O - https://raw.githubusercontent.com/waydroid/android_vendor_waydroid/lineage-20/manifest_scripts/generate-manifest.sh | bash
nvim .repo/manifests/default.xml
repo sync

firewall-cmd --zone=trusted --add-port=67/udp
firewall-cmd --zone=trusted --add-port=53/udp
firewall-cmd --zone=trusted --add-forward
firewall-cmd --zone=trusted --add-interface=waydroid0