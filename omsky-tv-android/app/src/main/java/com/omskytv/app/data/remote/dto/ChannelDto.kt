package com.omskytv.app.data.remote.dto

import com.google.gson.annotations.SerializedName

data class ChannelDto(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String,
    @SerializedName("alt_names") val altNames: List<String> = emptyList(),
    @SerializedName("network") val network: String? = null,
    @SerializedName("owners") val owners: List<String> = emptyList(),
    @SerializedName("country") val country: String,
    @SerializedName("categories") val categories: List<String> = emptyList(),
    @SerializedName("is_nsfw") val isNsfw: Boolean = false,
    @SerializedName("launched") val launched: String? = null,
    @SerializedName("closed") val closed: String? = null,
    @SerializedName("replaced_by") val replacedBy: String? = null,
    @SerializedName("website") val website: String? = null,
    @SerializedName("logo") val logo: String? = null
)

data class StreamDto(
    @SerializedName("channel") val channel: String,
    @SerializedName("url") val url: String,
    @SerializedName("http_referrer") val httpReferrer: String? = null,
    @SerializedName("user_agent") val userAgent: String? = null,
    @SerializedName("timeshift") val timeshift: String? = null
)
