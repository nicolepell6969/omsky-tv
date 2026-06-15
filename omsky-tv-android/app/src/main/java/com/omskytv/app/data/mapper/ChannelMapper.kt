package com.omskytv.app.data.mapper

import com.omskytv.app.data.remote.dto.ChannelDto
import com.omskytv.app.data.remote.dto.StreamDto
import com.omskytv.app.domain.model.Channel
import com.omskytv.app.domain.model.Stream

fun ChannelDto.toChannel(): Channel {
    return Channel(
        id = id,
        name = name,
        altNames = altNames,
        network = network,
        owners = owners,
        country = country,
        categories = categories,
        isNsfw = isNsfw,
        launched = launched,
        closed = closed,
        replacedBy = replacedBy,
        website = website,
        logo = logo
    )
}

fun StreamDto.toStream(): Stream {
    return Stream(
        channel = channel,
        url = url,
        httpReferrer = httpReferrer,
        userAgent = userAgent,
        timeshift = timeshift
    )
}
