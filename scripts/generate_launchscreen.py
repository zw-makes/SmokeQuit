#!/usr/bin/env python3
import subprocess
import plistlib
import os
import re

# Get exact ibtool toolsVersion from the running Xcode installation
tools_ver = "23049"
plugin_ver = "23034"

try:
    result = subprocess.run(
        ["xcrun", "ibtool", "--version"],
        capture_output=True, text=True
    )
    output = result.stdout + result.stderr
    m = re.search(r'toolsVersion[^=]*=\s*(\d+)', output)
    if m:
        tools_ver = m.group(1)
    print(f"ibtool output: {output[:200]}")
except Exception as e:
    print(f"Could not get ibtool version: {e}")

try:
    xcode_path = subprocess.run(
        ["xcode-select", "-p"],
        capture_output=True, text=True
    ).stdout.strip()
    xcode_app = xcode_path.replace("/Contents/Developer", "")
    plugin_plist_path = os.path.join(
        xcode_app,
        "Contents/Developer/Library/Xib Compilers/IBCocoaTouchPlugin.ibplugin/Contents/Info.plist"
    )
    with open(plugin_plist_path, "rb") as f:
        plist_data = plistlib.load(f)
    plugin_ver = str(plist_data.get("CFBundleVersion", "23034"))
    print(f"Plugin version from plist: {plugin_ver}")
except Exception as e:
    print(f"Could not get plugin version: {e}")

print(f"Generating LaunchScreen.storyboard with toolsVersion={tools_ver}, pluginVersion={plugin_ver}")

storyboard = f"""<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="{tools_ver}" targetRuntime="AppleCocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="01J-lp-oVM">
    <device id="retina6_12" orientation="portrait" appearance="light"/>
    <dependencies>
        <deployment identifier="iOS"/>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="{plugin_ver}"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <scene sceneID="EHf-IW-A2E">
            <objects>
                <viewController id="01J-lp-oVM" sceneMemberID="viewController">
                    <view key="view" contentMode="scaleToFill" id="Ze5-6b-2t3">
                        <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <color key="backgroundColor" red="0.051" green="0.082" blue="0.161" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="iYj-Kq-Ea1" userLabel="First Responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="53" y="375"/>
        </scene>
    </scenes>
</document>
"""

output_path = os.path.join("SmokeQuit", "LaunchScreen.storyboard")
with open(output_path, "w", encoding="utf-8") as f:
    f.write(storyboard)

print(f"Written: {output_path}")
